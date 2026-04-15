import type { User } from '@supabase/supabase-js';
import { supabase } from './client';

const PROFILE_SELECT = 'id, username, email, display_name, has_completed_avatar_setup';

export interface SupabaseProfileRecord {
    id: string;
    username: string;
    email: string;
    display_name: string | null;
    has_completed_avatar_setup: boolean | null;
}

function normalizeText(value: unknown): string | null {
    if (typeof value !== 'string') return null;

    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
}

function fallbackUsername(user: User): string {
    const emailPrefix = normalizeText(user.email)?.split('@')[0];
    if (emailPrefix) return emailPrefix;

    return `user_${user.id.replace(/-/g, '').slice(0, 8)}`;
}

function getPreferredUsername(user: User): string {
    return normalizeText(user.user_metadata.username) ?? fallbackUsername(user);
}

function getPreferredDisplayName(user: User, username: string): string {
    return normalizeText(user.user_metadata.display_name) ?? username;
}

async function getProfileById(userId: string): Promise<SupabaseProfileRecord | null> {
    const { data, error } = await supabase
        .from('profiles')
        .select(PROFILE_SELECT)
        .eq('id', userId)
        .maybeSingle();

    if (error) throw error;

    return data;
}

async function hasAuthenticatedSession(userId: string): Promise<boolean> {
    const { data, error } = await supabase.auth.getSession();

    if (error) throw error;

    return data.session?.user?.id === userId;
}

async function resolveAvailableUsername(user: User): Promise<string> {
    const preferredUsername = getPreferredUsername(user);
    const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', preferredUsername)
        .maybeSingle();

    if (error) throw error;
    if (!data || data.id === user.id) return preferredUsername;

    return `${preferredUsername}_${user.id.replace(/-/g, '').slice(0, 6)}`;
}

async function ensureUserStreak(userId: string): Promise<void> {
    const { error } = await supabase
        .from('user_streaks')
        .upsert(
            {
                user_id: userId,
                current_streak: 0,
                longest_streak: 0,
            },
            { onConflict: 'user_id' }
        );

    if (error) {
        console.warn('Failed to initialize user streak row:', error);
    }
}

export async function ensureSupabaseProfile(user: User): Promise<SupabaseProfileRecord | null> {
    const existingProfile = await getProfileById(user.id);
    const hasSession = await hasAuthenticatedSession(user.id);

    if (existingProfile) {
        if (hasSession) {
            await ensureUserStreak(user.id);
        }

        return existingProfile;
    }

    if (!hasSession) {
        return null;
    }

    const email = normalizeText(user.email);
    if (!email) {
        throw new Error('Supabase user email is missing.');
    }

    const username = await resolveAvailableUsername(user);
    const { data, error } = await supabase
        .from('profiles')
        .upsert(
            {
                id: user.id,
                username,
                email,
                display_name: getPreferredDisplayName(user, username),
            },
            { onConflict: 'id' }
        )
        .select(PROFILE_SELECT)
        .single();

    if (error) {
        const concurrentProfile = await getProfileById(user.id);
        if (concurrentProfile) {
            await ensureUserStreak(user.id);
            return concurrentProfile;
        }

        throw error;
    }

    await ensureUserStreak(user.id);
    return data;
}

export async function isUsernameAvailable(username: string): Promise<boolean> {
    const normalizedUsername = normalizeText(username);
    if (!normalizedUsername) return false;

    const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', normalizedUsername)
        .maybeSingle();

    if (error) throw error;

    return !data;
}
