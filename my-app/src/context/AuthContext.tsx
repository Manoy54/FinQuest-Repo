import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import type { Session } from '@supabase/supabase-js';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AvatarConfig {
    sex?: string;
    earSize?: string;
    hairStyle?: string;
    hairColor?: string;
    hatStyle?: string;
    hatColor?: string;
    eyeStyle?: string;
    glassesStyle?: string;
    noseStyle?: string;
    mouthStyle?: string;
    shirtStyle?: string;
    shirtColor?: string;
    bgColor?: string;
    faceColor?: string;
    isGradient?: boolean;
}

interface AuthState {
    isAuthenticated: boolean;
    hasCompletedAvatarSetup: boolean;
    avatarConfig: AvatarConfig | null;
    username: string | null;
    displayName: string | null;
    level: number;
    rank: string;
    userId: string | null;
    isLoading: boolean;
}

interface AuthContextType extends AuthState {
    logout: () => Promise<void>;
    completeAvatarSetup: (config: AvatarConfig, displayName?: string) => Promise<void>;
    updateProfile: (updates: Partial<AuthState>) => void;
    refreshProfile: () => Promise<void>;
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AuthState>({
        isAuthenticated: false,
        hasCompletedAvatarSetup: false,
        avatarConfig: null,
        username: null,
        displayName: null,
        level: 1,
        rank: 'Student',
        userId: null,
        isLoading: true,
    });

    const fetchUserProfile = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                console.error("Error fetching profile:", error);
                return;
            }

            if (data) {
                setState(prev => ({
                    ...prev,
                    isAuthenticated: true,
                    hasCompletedAvatarSetup: data.has_completed_avatar_setup || false,
                    avatarConfig: data.avatar_config || null,
                    username: data.username || null,
                    displayName: data.display_name || null,
                    level: data.level || 1,
                    rank: data.rank || 'Student',
                    userId: data.id,
                    isLoading: false,
                }));
            }
        } catch (err) {
            console.error("Profile fetch error:", err);
            setState(prev => ({ ...prev, isLoading: false }));
        }
    };

    const handleSession = (session: Session | null) => {
        if (session?.user) {
            fetchUserProfile(session.user.id);
        } else {
            setState({
                isAuthenticated: false,
                hasCompletedAvatarSetup: false,
                avatarConfig: null,
                username: null,
                displayName: null,
                level: 1,
                rank: 'Student',
                userId: null,
                isLoading: false,
            });
        }
    };

    useEffect(() => {
        // Initial session check
        supabase.auth.getSession().then(({ data: { session } }) => {
            handleSession(session);
        });

        // Listen for auth changes (login, logout, etc)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                handleSession(session);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const logout = useCallback(async () => {
        await supabase.auth.signOut();
    }, []);

    const completeAvatarSetup = useCallback(async (config: AvatarConfig, displayName?: string) => {
        if (!state.userId) return;

        const updates: any = {
            avatar_config: config,
            has_completed_avatar_setup: true,
            updated_at: new Date().toISOString(),
        };

        if (displayName) {
            updates.display_name = displayName;
        }

        const { error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', state.userId);

        if (error) {
            console.error("Failed to save avatar setup:", error);
            return;
        }

        // Dispatch an event just in case components are still listening
        window.dispatchEvent(new Event('avatarChanged'));

        setState(prev => ({
            ...prev,
            hasCompletedAvatarSetup: true,
            avatarConfig: config,
            displayName: displayName || prev.displayName,
        }));
    }, [state.userId]);

    const updateProfile = useCallback((updates: Partial<AuthState>) => {
        setState(prev => ({ ...prev, ...updates }));
    }, []);

    const refreshProfile = useCallback(async () => {
        if (state.userId) await fetchUserProfile(state.userId);
    }, [state.userId]);

    return (
        <AuthContext.Provider value={{ ...state, logout, completeAvatarSetup, updateProfile, refreshProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
    return ctx;
}
