import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
    xp: number;
    coins: number;
    addXp: (amount: number) => void;
    addCoins: (amount: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [xp, setXp] = useState(() => {
        const saved = localStorage.getItem('userXP');
        return saved ? parseInt(saved) : 0;
    });
    const [coins, setCoins] = useState(() => {
        const saved = localStorage.getItem('userCoins');
        return saved ? parseInt(saved) : 0;
    });

    useEffect(() => {
        localStorage.setItem('userXP', xp.toString());
    }, [xp]);

    useEffect(() => {
        localStorage.setItem('userCoins', coins.toString());
    }, [coins]);

    const addXp = (amount: number) => {
        setXp(prev => prev + amount);
    };

    const addCoins = (amount: number) => {
        setCoins(prev => prev + amount);
    };

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
