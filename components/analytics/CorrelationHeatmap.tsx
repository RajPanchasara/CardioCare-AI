"use client";

import React, { useRef, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";

interface CorrelationHeatmapProps {
    features: string[];
    matrix: number[][];
}

export default function CorrelationHeatmap({ features, matrix }: CorrelationHeatmapProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        if (!canvasRef.current || !matrix.length) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const n = features.length;
        const cellSize = 48;
        const labelOffset = 80;
        const legendWidth = 50;
        const w = labelOffset + n * cellSize + legendWidth;
        const h = labelOffset + n * cellSize + 20;

        canvas.width = w * 2;  // HiDPI
        canvas.height = h * 2;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.scale(2, 2);

        const isDark = theme === 'dark';
        ctx.fillStyle = isDark ? '#1e293b' : '#ffffff';
        ctx.fillRect(0, 0, w, h);

        // Draw cells
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const val = matrix[i][j];
                const x = labelOffset + j * cellSize;
                const y = labelOffset + i * cellSize;

                // Color: blue for positive, red for negative
                let r, g, b;
                if (val >= 0) {
                    r = Math.round(255 - val * 185);
                    g = Math.round(255 - val * 130);
                    b = 255;
                } else {
                    const abs = Math.abs(val);
                    r = 255;
                    g = Math.round(255 - abs * 185);
                    b = Math.round(255 - abs * 185);
                }

                ctx.fillStyle = `rgb(${r},${g},${b})`;
                ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);

                // Value text
                ctx.fillStyle = Math.abs(val) > 0.5 ? '#ffffff' : (isDark ? '#e2e8f0' : '#1e293b');
                ctx.font = 'bold 9px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(val.toFixed(2), x + cellSize / 2, y + cellSize / 2);
            }
        }

        // Row labels (left)
        ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
        ctx.font = 'bold 9px Inter, sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        for (let i = 0; i < n; i++) {
            ctx.fillText(features[i], labelOffset - 6, labelOffset + i * cellSize + cellSize / 2);
        }

        // Column labels (top, rotated)
        ctx.save();
        ctx.textAlign = 'left';
        for (let j = 0; j < n; j++) {
            ctx.save();
            ctx.translate(labelOffset + j * cellSize + cellSize / 2, labelOffset - 6);
            ctx.rotate(-Math.PI / 4);
            ctx.fillText(features[j], 0, 0);
            ctx.restore();
        }
        ctx.restore();

        // Color legend
        const lx = labelOffset + n * cellSize + 15;
        const ly = labelOffset;
        const lh = n * cellSize;
        const gradient = ctx.createLinearGradient(lx, ly, lx, ly + lh);
        gradient.addColorStop(0, 'rgb(70,125,255)');
        gradient.addColorStop(0.5, 'rgb(255,255,255)');
        gradient.addColorStop(1, 'rgb(255,70,70)');
        ctx.fillStyle = gradient;
        ctx.fillRect(lx, ly, 12, lh);

        ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
        ctx.font = 'bold 9px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('1.0', lx + 16, ly + 4);
        ctx.fillText('0.0', lx + 16, ly + lh / 2);
        ctx.fillText('-1.0', lx + 16, ly + lh);

    }, [features, matrix, theme]);

    if (!matrix.length) {
        return (
            <div className="card p-6 md:p-8 text-center">
                <h3 className="text-lg font-black mb-2 flex items-center gap-2">
                    <span className="text-xl">🔥</span> Feature Correlation
                </h3>
                <p className="text-secondary text-sm">Correlation data unavailable — training CSV not found.</p>
            </div>
        );
    }

    return (
        <div className="card p-6 md:p-8">
            <h3 className="text-lg font-black mb-2 flex items-center gap-2">
                <span className="text-xl">🔥</span> Feature Correlation
            </h3>
            <p className="text-xs text-secondary mb-4">
                Shows Pearson correlation between all input features. Red = negative, Blue = positive. Hovering reveals exact values.
            </p>
            <div className="overflow-x-auto">
                <canvas ref={canvasRef} />
            </div>
        </div>
    );
}
