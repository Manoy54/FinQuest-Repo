import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

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
}

interface AuthContextType extends AuthState {
    login: (username: string) => { needsAvatarSetup: boolean };
    logout: () => void;
    completeAvatarSetup: (config: AvatarConfig, displayName?: string) => void;
    updateProfile: (updates: Partial<AuthState>) => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const AUTH_STORAGE_KEY = 'auth_state';

function loadAuth(): AuthState {
    try {
        const raw = localStorage.getItem(AUTH_STORAGE_KEY);
        if (raw) return JSON.parse(raw);
    } catch { /* ignore corrupt data */ }

    return {
        isAuthenticated: false,
        hasCompletedAvatarSetup: false,
        avatarConfig: null,
        username: null,
        displayName: null,
        level: 1,
        rank: 'Student',
    };
}

function saveAuth(state: AuthState) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AuthState>(loadAuth);

    // Persist whenever state changes
    useEffect(() => {
        saveAuth(state);
    }, [state]);

    const login = useCallback((username: string) => {
        // Check if user already has a saved avatar (legacy / returning user)
        const existingAvatar = localStorage.getItem('userAvatarConfig');
        const existingDisplayName = localStorage.getItem('userDisplayName');

        // Check if we have auth state for this user to restore level/rank
        // For now, simpler to just start fresh or rely on what's in state if we were persisting properly per-user
        // But since we are doing simple local storage auth:

        const alreadySetup = !!existingAvatar;

        const newState: AuthState = {
            isAuthenticated: true,
            hasCompletedAvatarSetup: alreadySetup,
            avatarConfig: existingAvatar ? JSON.parse(existingAvatar) : null,
            username,
            displayName: existingDisplayName || username.split('@')[0], // Default to part of username if no display name
            level: 1, // Default level
            rank: 'Student', // Default rank
        };

        // If we had stored state, we could restore level/rank here, but for now defaults are fine for "new" login simulation
        // If we want to persist level/rank across logins, we should store them like userAvatarConfig

        // Let's try to restore if available from a previous session in this browser
        const storedLevel = localStorage.getItem('userLevel');
        if (storedLevel) newState.level = parseInt(storedLevel);

        const storedRank = localStorage.getItem('userRank');
        if (storedRank) newState.rank = storedRank;

        setState(newState);
        return { needsAvatarSetup: !alreadySetup };
    }, []);

    const logout = useCallback(() => {
        setState({
            isAuthenticated: false,
            hasCompletedAvatarSetup: false,
            avatarConfig: null,
            username: null,
            displayName: null,
            level: 1,
            rank: 'Student',
        });
        localStorage.removeItem(AUTH_STORAGE_KEY);
    }, []);

    const completeAvatarSetup = useCallback((config: AvatarConfig, displayName?: string) => {
        // Persist avatar config to the same key the Profile page uses
        localStorage.setItem('userAvatarConfig', JSON.stringify(config));
        if (displayName) localStorage.setItem('userDisplayName', displayName);

        window.dispatchEvent(new Event('avatarChanged'));

        setState(prev => ({
            ...prev,
            hasCompletedAvatarSetup: true,
            avatarConfig: config,
            displayName: displayName || prev.displayName,
        }));
    }, []);

    const updateProfile = useCallback((updates: Partial<AuthState>) => {
        setState(prev => {
            const newState = { ...prev, ...updates };

            // Persist specifics to localStorage for recovery on relogin
            if (updates.displayName) localStorage.setItem('userDisplayName', updates.displayName);
            if (updates.level) localStorage.setItem('userLevel', updates.level.toString());
            if (updates.rank) localStorage.setItem('userRank', updates.rank);

            return newState;
        });
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, login, logout, completeAvatarSetup, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
    return ctx;
}
