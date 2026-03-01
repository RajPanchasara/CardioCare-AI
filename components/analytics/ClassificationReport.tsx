"use client";

import React from "react";

interface ClassificationReportProps {
    data: {
        [key: string]: { precision: number; recall: number; f1: number; support: number };
    };
    accuracy: number;
}

export default function ClassificationReport({ data, accuracy }: ClassificationReportProps) {
    const rows = [
        { label: 'Class 0 (No Risk)', key: '0' },
        { label: 'Class 1 (Risk)', key: '1' },
    ];
    const avgRows = [
        { label: 'Macro Avg', key: 'macro_avg' },
        { label: 'Weighted Avg', key: 'weighted_avg' },
    ];

    return (
        <div className="card p-6 md:p-8">
            <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                <span className="text-xl">📋</span> Classification Report
            </h3>
            <p className="text-xs text-secondary mb-4">
                Per-class precision, recall, and F1-score from the test set evaluation.
            </p>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-2 text-xs font-bold text-gray-400 uppercase">Metric</th>
                            <th className="text-center py-2 text-xs font-bold text-gray-400 uppercase">Precision</th>
                            <th className="text-center py-2 text-xs font-bold text-gray-400 uppercase">Recall</th>
                            <th className="text-center py-2 text-xs font-bold text-gray-400 uppercase">F1-Score</th>
                            <th className="text-center py-2 text-xs font-bold text-gray-400 uppercase">Support</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r) => {
                            const d = data[r.key];
                            if (!d) return null;
                            return (
                                <tr key={r.key} className="border-b border-gray-100">
                                    <td className="py-3 font-semibold text-[var(--text-main)]">{r.label}</td>
                                    <td className="py-3 text-center font-bold">{d.precision.toFixed(2)}</td>
                                    <td className="py-3 text-center font-bold">{d.recall.toFixed(2)}</td>
                                    <td className="py-3 text-center font-bold">{d.f1.toFixed(2)}</td>
                                    <td className="py-3 text-center text-secondary">{d.support.toLocaleString()}</td>
                                </tr>
                            );
                        })}
                        <tr className="border-b-2 border-gray-300">
                            <td className="py-3 font-bold text-primary">Accuracy</td>
                            <td colSpan={2} />
                            <td className="py-3 text-center font-black text-primary">{accuracy.toFixed(2)}</td>
                            <td className="py-3 text-center text-secondary">{data['macro_avg']?.support?.toLocaleString()}</td>
                        </tr>
                        {avgRows.map((r) => {
                            const d = data[r.key];
                            if (!d) return null;
                            return (
                                <tr key={r.key} className="border-b border-gray-100">
                                    <td className="py-3 font-semibold text-secondary">{r.label}</td>
                                    <td className="py-3 text-center">{d.precision.toFixed(2)}</td>
                                    <td className="py-3 text-center">{d.recall.toFixed(2)}</td>
                                    <td className="py-3 text-center">{d.f1.toFixed(2)}</td>
                                    <td className="py-3 text-center text-secondary">{d.support.toLocaleString()}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
