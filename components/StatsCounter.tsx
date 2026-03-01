"use client";

import React, { useEffect, useState, useRef } from "react";

interface StatsCounterProps {
    className?: string;
}

function AnimatedNumber({ value, duration = 1800 }: { value: number; duration?: number }) {
    const [display, setDisplay] = useState(0);
    const ref = useRef<number>(0);

    useEffect(() => {
        if (value <= 0) { setDisplay(0); return; }
        const start = ref.current;
        const diff = value - start;
        const startTime = performance.now();

        const animate = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + diff * eased);
            setDisplay(current);
            if (progress < 1) requestAnimationFrame(animate);
            else ref.current = value;
        };
        requestAnimationFrame(animate);
    }, [value, duration]);

    return <>{display.toLocaleString()}</>;
}

export default function StatsCounter({ className = "" }: StatsCounterProps) {
    const [stats, setStats] = useState<{ total_visits: number; total_predictions: number } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/stats')
            .then((r) => r.json())
            .then((data) => {
                setStats({
                    total_visits: data.total_visits || 0,
                    total_predictions: data.total_predictions || 0,
                });
            })
            .catch(() => setStats({ total_visits: 0, total_predictions: 0 }))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className={`grid grid-cols-2 gap-3 w-full ${className}`}>
                {[0, 1].map((i) => (
                    <div key={i} className="card p-5 text-center animate-pulse">
                        <div className="h-10 w-16 bg-gray-200 rounded-lg mx-auto mb-2" />
                        <div className="h-3 w-20 bg-gray-100 rounded mx-auto" />
                    </div>
                ))}
            </div>
        );
    }

    if (!stats) return null;

    const counters = [
        { value: stats.total_visits, label: "Visitors" },
        { value: stats.total_predictions, label: "Predictions" },
    ];

    return (
        <div className={`grid grid-cols-2 gap-3 w-full ${className}`}>
            {counters.map((c) => (
                <div
                    key={c.label}
                    className="card flex flex-col items-center justify-center text-center min-h-[130px] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg cursor-default"
                >
                    <div
                        className="font-black text-[var(--text-main)] leading-none tracking-tight mb-2"
                        style={{ fontSize: "clamp(28px, 5vw, 48px)" }}
                    >
                        <AnimatedNumber value={c.value} />
                    </div>
                    <div className="text-[13px] font-semibold text-gray-500 uppercase tracking-[0.12em] mb-1">
                        {c.label}
                    </div>

                </div>
            ))}
        </div>
    );
}
