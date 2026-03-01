"use client";

import React from "react";
import { Radar } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js";
import { getThemeColors, CHART_ANIMATION } from "@/utils/chartConfig";
import { useTheme } from "@/components/ThemeProvider";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface HealthRadarProps {
    systolic: number;
    diastolic: number;
    cholesterol: number;
    glucose: number;
    bmi: number;
}

export default function HealthRadar({ systolic, diastolic, cholesterol, glucose, bmi }: HealthRadarProps) {
    const { theme } = useTheme();
    const colors = getThemeColors(theme);

    // Normalize values to 0-100 scale for radar
    const normalize = (val: number, max: number) => Math.min((val / max) * 100, 100);

    const userData = [
        normalize(systolic, 180),
        normalize(diastolic, 120),
        normalize(cholesterol * 66, 200), // scale 1-3 to rough mg/dL
        normalize(glucose * 50, 150),
        normalize(bmi, 40),
    ];

    const idealData = [
        normalize(120, 180),
        normalize(80, 120),
        normalize(66, 200),
        normalize(50, 150),
        normalize(22, 40),
    ];

    const data = {
        labels: ['Systolic BP', 'Diastolic BP', 'Cholesterol', 'Glucose', 'BMI'],
        datasets: [
            {
                label: 'Ideal',
                data: idealData,
                backgroundColor: 'rgba(34, 197, 94, 0.15)',
                borderColor: '#22c55e',
                pointBackgroundColor: '#22c55e',
                borderWidth: 2,
            },
            {
                label: 'You',
                data: userData,
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: '#3b82f6',
                pointBackgroundColor: '#3b82f6',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: CHART_ANIMATION,
        scales: {
            r: {
                angleLines: { color: colors.angleLines },
                grid: { color: colors.grid },
                pointLabels: { color: colors.text, font: { size: 10, weight: 'bold' as const } },
                ticks: { display: false },
                suggestedMin: 0,
                suggestedMax: 100,
            },
        },
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: { color: colors.text, font: { size: 11 }, usePointStyle: true, padding: 20 },
            },
        },
    };

    return (
        <div className="card p-6 md:p-8">
            <h3 className="text-lg font-black mb-2">Health Profile Shape</h3>
            <div className="h-[300px]">
                <Radar data={data} options={options} />
            </div>
            <p className="text-center text-[10px] text-secondary mt-2 italic">
                Comparison of your metrics (Blue) vs Ideal levels (Green)
            </p>
        </div>
    );
}
