"use client";

import React from "react";

interface VitalsCardsProps {
    systolic: number;
    diastolic: number;
    cholesterol: number;
    glucose: number;
    bmi: number;
    heartRate?: number;
}

export default function VitalsCards({ systolic, diastolic, cholesterol, glucose, bmi }: VitalsCardsProps) {
    const cholLabels: Record<number, string> = { 1: 'Normal', 2: 'Above Normal', 3: 'Well Above Normal' };
    const glucLabels: Record<number, string> = { 1: 'Normal', 2: 'Above Normal', 3: 'Well Above Normal' };

    const vitals = [
        {
            label: 'Blood Pressure',
            value: `${systolic}/${diastolic}`,
            unit: 'mmHg',
            icon: '🫀',
            status: systolic < 120 && diastolic < 80 ? 'Normal' : systolic < 140 ? 'Elevated' : 'High',
            description: 'Measures force of blood on artery walls. Normal: <120/80 mmHg.',
        },
        {
            label: 'BMI',
            value: bmi.toString(),
            unit: 'kg/m²',
            icon: '⚖️',
            status: bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese',
            description: 'Body Mass Index — ratio of weight to height squared.',
        },
        {
            label: 'Cholesterol',
            value: cholLabels[cholesterol] || `Level ${cholesterol}`,
            unit: '',
            icon: '🩸',
            status: cholesterol === 1 ? 'Normal' : cholesterol === 2 ? 'Elevated' : 'High',
            description: 'Waxy substance in blood. High levels increase CVD risk.',
        },
        {
            label: 'Glucose',
            value: glucLabels[glucose] || `Level ${glucose}`,
            unit: '',
            icon: '💉',
            status: glucose === 1 ? 'Normal' : glucose === 2 ? 'Elevated' : 'High',
            description: 'Blood sugar level. Elevated values indicate diabetes risk.',
        },
    ];

    const statusColor = (s: string) => {
        if (['Normal'].includes(s)) return '#22c55e';
        if (['Elevated', 'Overweight', 'Above Normal'].includes(s)) return '#f59e0b';
        return '#ef4444';
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {vitals.map((v) => (
                <div key={v.label} className="card p-5">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">{v.icon}</span>
                            <span className="text-sm font-bold text-[var(--text-main)]">{v.label}</span>
                        </div>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                            style={{ background: statusColor(v.status) + '20', color: statusColor(v.status) }}>
                            {v.status}
                        </span>
                    </div>
                    <div className="text-2xl font-black text-[var(--text-main)]">
                        {v.value} <span className="text-xs font-normal text-secondary">{v.unit}</span>
                    </div>
                    <p className="text-[10px] text-secondary mt-2 leading-relaxed">{v.description}</p>
                </div>
            ))}
        </div>
    );
}
