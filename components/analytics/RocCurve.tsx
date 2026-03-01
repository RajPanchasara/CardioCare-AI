"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";
import { getThemeColors, CHART_ANIMATION } from "@/utils/chartConfig";
import { useTheme } from "@/components/ThemeProvider";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface RocCurveProps {
    fpr: number[];
    tpr: number[];
    auc: number;
}

export default function RocCurve({ fpr, tpr, auc: aucValue }: RocCurveProps) {
    const { theme } = useTheme();
    const colors = getThemeColors(theme);

    const data = {
        labels: fpr.map(v => v.toFixed(2)),
        datasets: [
            {
                label: `ROC Curve (AUC = ${aucValue.toFixed(4)})`,
                data: tpr,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.3,
                pointRadius: 0,
                borderWidth: 2.5,
            },
            {
                label: 'Random Forest',
                data: fpr, // diagonal
                borderColor: '#94a3b8',
                borderDash: [5, 5],
                fill: false,
                pointRadius: 0,
                borderWidth: 1.5,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: CHART_ANIMATION,
        scales: {
            x: {
                title: { display: true, text: 'False Positive Rate', color: colors.text, font: { size: 11, weight: 'bold' as const } },
                grid: { color: colors.grid },
                ticks: { color: colors.text, maxTicksLimit: 6 },
            },
            y: {
                title: { display: true, text: 'True Positive Rate', color: colors.text, font: { size: 11, weight: 'bold' as const } },
                grid: { color: colors.grid },
                ticks: { color: colors.text },
                min: 0, max: 1,
            },
        },
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: { color: colors.text, font: { size: 10 }, usePointStyle: true, padding: 15 },
            },
            tooltip: {
                callbacks: {
                    label: (ctx: any) => `TPR: ${Number(ctx.parsed.y).toFixed(3)} | FPR: ${ctx.label}`,
                },
            },
        },
    };

    return (
        <div className="card p-6 md:p-8">
            <h3 className="text-lg font-black mb-2 flex items-center gap-2">
                <span className="text-xl">📉</span> ROC Curve
            </h3>
            <p className="text-xs text-secondary mb-4">
                Receiver Operating Characteristic — measures model{"\u0027"}s ability to distinguish between classes. Area Under Curve (AUC) closer to 1.0 = better.
            </p>
            <div className="h-[300px]">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}
