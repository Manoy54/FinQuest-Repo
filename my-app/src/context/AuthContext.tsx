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
}

interface AuthContextType extends AuthState {
    login: (username: string) => { needsAvatarSetup: boolean };
    logout: () => void;
    completeAvatarSetup: (config: AvatarConfig) => void;
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
        const alreadySetup = !!existingAvatar;

        const newState: AuthState = {
            isAuthenticated: true,
            hasCompletedAvatarSetup: alreadySetup,
            avatarConfig: existingAvatar ? JSON.parse(existingAvatar) : null,
            username,
        };

        setState(newState);
        return { needsAvatarSetup: !alreadySetup };
    }, []);

    const logout = useCallback(() => {
        setState({
            isAuthenticated: false,
            hasCompletedAvatarSetup: false,
            avatarConfig: null,
            username: null,
        });
        localStorage.removeItem(AUTH_STORAGE_KEY);
    }, []);

    const completeAvatarSetup = useCallback((config: AvatarConfig) => {
        // Persist avatar config to the same key the Profile page uses
        localStorage.setItem('userAvatarConfig', JSON.stringify(config));
        window.dispatchEvent(new Event('avatarChanged'));

        setState(prev => ({
            ...prev,
            hasCompletedAvatarSetup: true,
            avatarConfig: config,
        }));
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, login, logout, completeAvatarSetup }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
    return ctx;
}
