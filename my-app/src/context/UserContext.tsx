import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from './AuthContext';

interface UserContextType {
    xp: number;
    coins: number;
    addXp: (amount: number) => void;
    addCoins: (amount: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { userId, refreshProfile } = useAuth();
    const [xp, setXp] = useState(0);
    const [coins, setCoins] = useState(0);

    // Initial load when user auth is ready
    useEffect(() => {
        const loadStats = async () => {
            if (!userId) {
                setXp(0);
                setCoins(0);
                return;
            }

            const { data, error } = await supabase
                .from('profiles')
                .select('xp, coins')
                .eq('id', userId)
                .single();

            if (!error && data) {
                setXp(data.xp || 0);
                setCoins(data.coins || 0);
            }
        };

        loadStats();
    }, [userId]);

    const addXp = useCallback(async (amount: number) => {
        setXp(prev => prev + amount); // Optimistic UI update
        if (userId) {
            await supabase.rpc('add_user_rewards', {
                p_user_id: userId,
                p_xp: amount,
                p_coins: 0
            });
            refreshProfile(); // So AuthContext updates level/rank
        }
    }, [userId, refreshProfile]);

    const addCoins = useCallback(async (amount: number) => {
        setCoins(prev => prev + amount); // Optimistic UI update
        if (userId) {
            await supabase.rpc('add_user_rewards', {
                p_user_id: userId,
                p_xp: 0,
                p_coins: amount
            });
            refreshProfile(); // So AuthContext updates level/rank
        }
    }, [userId, refreshProfile]);

    return (
        <UserContext.Provider value={{ xp, coins, addXp, addCoins }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
