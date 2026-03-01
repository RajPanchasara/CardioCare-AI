"use client";

import React from "react";

interface ConfusionMatrixProps {
    matrix: number[][];  // [[TN, FP], [FN, TP]]
}

export default function ConfusionMatrix({ matrix }: ConfusionMatrixProps) {
    const [[tn, fp], [fn, tp]] = matrix;
    const total = tn + fp + fn + tp;

    const cells = [
        { value: tn, label: 'TN', color: '#22c55e', bg: '#dcfce7', row: 'No Risk', col: 'No Risk' },
        { value: fp, label: 'FP', color: '#ef4444', bg: '#fee2e2', row: 'No Risk', col: 'Risk' },
        { value: fn, label: 'FN', color: '#ef4444', bg: '#fee2e2', row: 'Risk', col: 'No Risk' },
        { value: tp, label: 'TP', color: '#22c55e', bg: '#dcfce7', row: 'Risk', col: 'Risk' },
    ];

    return (
        <div className="card p-6 md:p-8">
            <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                <span className="text-xl">🔲</span> Confusion Matrix
            </h3>
            <p className="text-xs text-secondary mb-4">
                Shows how predictions align with actual outcomes. Green = correct, Red = errors.
            </p>

            {/* Axis label */}
            <div className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Predicted</div>

            <div className="grid grid-cols-2 gap-3 max-w-[280px] mx-auto">
                {cells.map((c, i) => (
                    <div key={i} className="p-5 rounded-2xl text-center transition-transform hover:scale-105"
                        style={{ background: c.bg }}>
                        <div className="text-2xl font-black" style={{ color: c.color }}>
                            {c.value.toLocaleString()}
                        </div>
                        <div className="text-[10px] font-bold mt-1" style={{ color: c.color }}>{c.label}</div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-3">
                <span className="text-[10px] text-secondary">
                    Total: {total.toLocaleString()} | Correct: {((tn + tp) / total * 100).toFixed(1)}%
                </span>
            </div>
        </div>
    );
}
