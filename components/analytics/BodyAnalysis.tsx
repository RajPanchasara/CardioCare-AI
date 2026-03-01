"use client";

import React from "react";

interface BodyAnalysisProps {
    bmi: number;
    bmiCategory: string;
    height: number;
    weight: number;
}

export default function BodyAnalysis({ bmi, bmiCategory, height, weight }: BodyAnalysisProps) {
    const getCategoryColor = () => {
        if (bmi < 18.5) return '#3b82f6';
        if (bmi < 25) return '#22c55e';
        if (bmi < 30) return '#f59e0b';
        return '#ef4444';
    };

    const getCategoryPosition = () => {
        const min = 12, max = 42;
        const clamped = Math.min(Math.max(bmi, min), max);
        return ((clamped - min) / (max - min)) * 100;
    };

    const circumference = 2 * Math.PI * 45;
    const bmiNormalized = Math.min(bmi / 40, 1);
    const strokeDashoffset = circumference * (1 - bmiNormalized);

    return (
        <div className="card p-6 md:p-8">
            <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                <span className="text-xl">⚖️</span> Body Analysis
            </h3>
            <div className="flex items-center gap-8">
                {/* BMI Ring */}
                <div className="relative flex-shrink-0">
                    <svg width="110" height="110" viewBox="0 0 110 110">
                        <circle cx="55" cy="55" r="45" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                        <circle
                            cx="55" cy="55" r="45" fill="none"
                            stroke={getCategoryColor()}
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            transform="rotate(-90 55 55)"
                            style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-black" style={{ color: getCategoryColor() }}>{bmi}</span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase">BMI</span>
                    </div>
                </div>

                {/* Info */}
                <div>
                    <div className="text-xs font-bold uppercase text-gray-400 tracking-widest">Weight Status</div>
                    <div className="text-xl font-black mt-1" style={{ color: getCategoryColor() }}>{bmiCategory}</div>
                    <div className="text-xs text-secondary mt-1">Height: {height}cm | Weight: {weight}kg</div>
                </div>
            </div>

            {/* Category Bar */}
            <div className="mt-6 relative">
                <div className="flex h-3 rounded-full overflow-hidden">
                    <div className="flex-1 bg-blue-400" title="Underweight" />
                    <div className="flex-1 bg-green-400" title="Normal" />
                    <div className="flex-1 bg-amber-400" title="Overweight" />
                    <div className="flex-1 bg-red-400" title="Obese" />
                </div>
                {/* Marker */}
                <div
                    className="absolute -top-1 w-4 h-5 bg-white border-2 rounded-sm shadow-md transition-all duration-1000"
                    style={{ left: `${getCategoryPosition()}%`, borderColor: getCategoryColor(), transform: 'translateX(-50%)' }}
                />
                <div className="flex justify-between mt-2 text-[9px] font-bold text-gray-400 uppercase">
                    <span>Under</span>
                    <span>Normal</span>
                    <span>Over</span>
                    <span>Obese</span>
                </div>
            </div>
        </div>
    );
}
