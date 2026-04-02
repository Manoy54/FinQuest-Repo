
import React from 'react';

interface MetricCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    highlight?: boolean;
}

export function MetricCard({ icon, label, value, highlight }: MetricCardProps) {
    return (
        <div
            className={`flex items-center gap-3 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10 transition-all duration-300 ${highlight ? 'bg-amber-500/20 border-amber-500/50' : 'bg-white/5'}`}
        >
            <div className="text-2xl filter drop-shadow-lg animate-pulse-slow">
                {icon}
            </div>
            <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-white/50 font-bold">{label}</span>
                <span className="text-lg font-bold text-white font-mono">{value}</span>
            </div>
        </div>
    );
}
