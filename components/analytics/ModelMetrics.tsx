"use client";

import React from "react";

interface ModelMetricsProps {
    data: {
        model: {
            type: string;
            accuracy: number;
            auc: number;
            dataset_size: number;
            test_size: number;
            version: string;
        };
        source: string;
    };
}

export default function ModelMetrics({ data }: ModelMetricsProps) {
    const m = data.model;
    const cards = [
        { label: 'Accuracy', value: `${(m.accuracy * 100).toFixed(1)}%`, icon: '🎯' },
        { label: 'AUC Score', value: m.auc.toFixed(4), icon: '📈' },
        { label: 'Training Data', value: m.dataset_size.toLocaleString(), icon: '📊' },
        { label: 'Test Split', value: m.test_size.toLocaleString(), icon: '🧪' },
        { label: 'Model Type', value: m.type, icon: '🤖' },
        { label: 'Version', value: m.version, icon: '🏷️' },
    ];

    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {cards.map((c) => (
                    <div key={c.label} className="card p-5 text-center">
                        <div className="text-2xl mb-2">{c.icon}</div>
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{c.label}</div>
                        <div className="text-lg font-black text-[var(--text-main)]">{c.value}</div>
                    </div>
                ))}
            </div>
            {data.source === 'static' && (
                <p className="text-center text-[10px] text-amber-500 mt-3 font-semibold">
                    ⚠️ Using Precomputed Metrics — Training CSV not found
                </p>
            )}
        </div>
    );
}
