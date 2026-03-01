"use client";

import React from "react";

interface Vital {
    label: string;
    value: number;
    max: number;
    unit: string;
    thresholds: { normal: number; warning: number };
}

interface SeverityMonitorProps {
    systolic: number;
    diastolic: number;
    cholesterol: number;
    glucose: number;
    bmi: number;
}

export default function SeverityMonitor({ systolic, diastolic, cholesterol, glucose, bmi }: SeverityMonitorProps) {
    const vitals: Vital[] = [
        { label: 'Systolic BP', value: systolic, max: 200, unit: 'mmHg', thresholds: { normal: 120, warning: 140 } },
        { label: 'Diastolic BP', value: diastolic, max: 140, unit: 'mmHg', thresholds: { normal: 80, warning: 90 } },
        { label: 'BMI', value: bmi, max: 40, unit: 'kg/m²', thresholds: { normal: 25, warning: 30 } },
        { label: 'Cholesterol', value: cholesterol, max: 3, unit: 'level', thresholds: { normal: 1, warning: 2 } },
        { label: 'Glucose', value: glucose, max: 3, unit: 'level', thresholds: { normal: 1, warning: 2 } },
    ];

    const getSeverity = (v: Vital) => {
        if (v.value <= v.thresholds.normal) return { color: '#22c55e', bg: '#dcfce7', label: 'Normal' };
        if (v.value <= v.thresholds.warning) return { color: '#f59e0b', bg: '#fef3c7', label: 'Warning' };
        return { color: '#ef4444', bg: '#fee2e2', label: 'Critical' };
    };

    return (
        <div className="card p-6 md:p-8">
            <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                <span className="text-xl">📊</span> Metric Severity Monitor
            </h3>
            <div className="space-y-4">
                {vitals.map((v) => {
                    const s = getSeverity(v);
                    const pct = Math.min((v.value / v.max) * 100, 100);
                    return (
                        <div key={v.label}>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-bold text-[var(--text-main)]">{v.label}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-black" style={{ color: s.color }}>{v.value} {v.unit}</span>
                                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: s.bg, color: s.color }}>{s.label}</span>
                                </div>
                            </div>
                            <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${pct}%`, background: s.color }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
