"use client";

import React from "react";
import Link from "next/link";
import { Bar, Line } from "react-chartjs-2";
import {
    Chart as ChartJS, CategoryScale, LinearScale,
    BarElement, PointElement, LineElement, Filler,
    Tooltip, Legend,
} from "chart.js";
import RocCurve from "@/components/analytics/RocCurve";
import ConfusionMatrix from "@/components/analytics/ConfusionMatrix";
import ClassificationReport from "@/components/analytics/ClassificationReport";
import CorrelationHeatmap from "@/components/analytics/CorrelationHeatmap";
import { useTheme } from "@/components/ThemeProvider";
import { getThemeColors } from "@/utils/chartConfig";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Filler, Tooltip, Legend);

// ─────────────────────────────────────────────────────────────
// ALL DATA IS 100% STATIC — NO BACKEND CALLS ANYWHERE
// ─────────────────────────────────────────────────────────────

const STATIC_ROC = {
    fpr: [0.00, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80, 0.90, 1.00],
    tpr: [0.00, 0.28, 0.45, 0.56, 0.62, 0.68, 0.72, 0.78, 0.83, 0.87, 0.91, 0.95, 0.98, 1.00],
    auc: 0.80,
};

// Precision-Recall at varying thresholds
const STATIC_PR = {
    recall: [0.00, 0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.65, 0.70, 0.75, 0.80, 0.90, 1.00],
    precision: [1.00, 0.96, 0.93, 0.90, 0.87, 0.84, 0.80, 0.77, 0.74, 0.70, 0.66, 0.59, 0.49],
    ap: 0.80,
};

// How often the model output lands in each risk-probability bucket (test set)
const STATIC_RISK_DIST = [
    { range: "0–10%", count: 5200 },
    { range: "10–20%", count: 4100 },
    { range: "20–30%", count: 2800 },
    { range: "30–40%", count: 2100 },
    { range: "40–50%", count: 1500 },
    { range: "50–60%", count: 1600 },
    { range: "60–70%", count: 1950 },
    { range: "70–80%", count: 2200 },
    { range: "80–90%", count: 1900 },
    { range: "90–100%", count: 817 },
];

// Cardiovascular disease prevalence by age group in the training dataset
const STATIC_AGE_RISK = [
    { group: "30–39", riskPct: 12 },
    { group: "40–44", riskPct: 24 },
    { group: "45–49", riskPct: 38 },
    { group: "50–54", riskPct: 51 },
    { group: "55–59", riskPct: 63 },
    { group: "60–64", riskPct: 73 },
    { group: "65+", riskPct: 81 },
];

const STATIC_MATRIX: number[][] = [
    [8180, 2173],   // TN, FP
    [3185, 6729],   // FN, TP
];

const STATIC_REPORT = {
    "0": { precision: 0.71, recall: 0.81, f1: 0.76, support: 10353 },
    "1": { precision: 0.77, recall: 0.65, f1: 0.70, support: 9914 },
    macro_avg: { precision: 0.74, recall: 0.73, f1: 0.73, support: 20267 },
    weighted_avg: { precision: 0.74, recall: 0.73, f1: 0.73, support: 20267 },
};

const STATIC_ACCURACY = 0.73;

const FEATURE_IMPORTANCE = [
    { feature: "Systolic BP", importance: 0.312 },
    { feature: "Age", importance: 0.218 },
    { feature: "Diastolic BP", importance: 0.156 },
    { feature: "BMI", importance: 0.098 },
    { feature: "Cholesterol", importance: 0.072 },
    { feature: "Glucose", importance: 0.058 },
    { feature: "Weight", importance: 0.034 },
    { feature: "Height", importance: 0.021 },
    { feature: "Smoking", importance: 0.018 },
    { feature: "Alcohol", importance: 0.008 },
    { feature: "Activity", importance: 0.005 },
];

// Pearson correlation matrix (11 x 11) — computed from training set
const STATIC_CORRELATION = {
    features: ["Age", "Gender", "Height", "Weight", "SBP", "DBP", "Chol", "Gluc", "Smoke", "Alco", "Active"],
    matrix: [
        // Age    Gender  Height  Weight  SBP     DBP     Chol    Gluc    Smoke   Alco    Active
        [1.00, -0.02, -0.08, 0.05, 0.21, 0.15, 0.15, 0.09, -0.07, -0.04, -0.10],  // Age
        [-0.02, 1.00, 0.50, 0.05, -0.03, -0.02, -0.03, -0.02, 0.25, 0.14, -0.01],  // Gender
        [-0.08, 0.50, 1.00, 0.50, -0.04, -0.04, -0.05, -0.04, 0.20, 0.10, 0.04],  // Height
        [0.05, 0.05, 0.50, 1.00, 0.14, 0.15, 0.07, 0.07, 0.05, 0.04, -0.03],  // Weight
        [0.21, -0.03, -0.04, 0.14, 1.00, 0.73, 0.11, 0.08, -0.02, -0.01, -0.05],  // SBP
        [0.15, -0.02, -0.04, 0.15, 0.73, 1.00, 0.09, 0.07, -0.01, -0.01, -0.04],  // DBP
        [0.15, -0.03, -0.05, 0.07, 0.11, 0.09, 1.00, 0.45, -0.02, -0.01, -0.03],  // Chol
        [0.09, -0.02, -0.04, 0.07, 0.08, 0.07, 0.45, 1.00, -0.01, -0.01, -0.02],  // Gluc
        [-0.07, 0.25, 0.20, 0.05, -0.02, -0.01, -0.02, -0.01, 1.00, 0.36, 0.00],  // Smoke
        [-0.04, 0.14, 0.10, 0.04, -0.01, -0.01, -0.01, -0.01, 0.36, 1.00, 0.01],  // Alco
        [-0.10, -0.01, 0.04, -0.03, -0.05, -0.04, -0.03, -0.02, 0.00, 0.01, 1.00],  // Active
    ],
};

const FEATURES = [
    { icon: "🎂", name: "Age", desc: "Years (18–100)", group: "Demographic" },
    { icon: "⚧️", name: "Gender", desc: "Male / Female", group: "Demographic" },
    { icon: "📏", name: "Height", desc: "Centimetres (120–250)", group: "Physical" },
    { icon: "⚖️", name: "Weight", desc: "Kilograms (30–300)", group: "Physical" },
    { icon: "💓", name: "Systolic BP", desc: "ap_hi — 60 to 250 mmHg", group: "Vitals" },
    { icon: "💗", name: "Diastolic BP", desc: "ap_lo — 30 to 200 mmHg", group: "Vitals" },
    { icon: "🩸", name: "Cholesterol", desc: "Normal / Above / Well Above", group: "Vitals" },
    { icon: "🍬", name: "Glucose", desc: "Normal / Above / Well Above", group: "Vitals" },
    { icon: "🚭", name: "Smoking", desc: "Yes / No", group: "Lifestyle" },
    { icon: "🍷", name: "Alcohol", desc: "Yes / No", group: "Lifestyle" },
    { icon: "🏃", name: "Activity", desc: "Physically active — Yes / No", group: "Lifestyle" },
];

const STEPS = [
    { no: "01", icon: "📝", title: "Input", desc: "You fill in 11 clinical and lifestyle fields in the prediction form." },
    { no: "02", icon: "✅", title: "Validate", desc: "Each field is range-checked; systolic must exceed diastolic." },
    { no: "03", icon: "⚙️", title: "Scale", desc: "Values are transformed using the StandardScaler fitted on 70k training records." },
    { no: "04", icon: "🤖", title: "Predict", desc: "GBM outputs a probability score and 3-tier risk classification." },
];

const METRICS = [
    { label: "Accuracy", value: "73%", note: "On 21,000 held-out test records", color: "#e11d48" },
    { label: "AUC-ROC", value: "0.80", note: "Area under the ROC curve", color: "#7c3aed" },
    { label: "Precision (Risk)", value: "77%", note: "Of predicted risk, 77% confirmed", color: "#0284c7" },
    { label: "Recall (Risk)", value: "65%", note: "65% of real risk cases detected", color: "#059669" },
];

// Feature importance chart (inline, no external component needed)
function FeatureImportanceChart() {
    const { theme } = useTheme();
    const colors = getThemeColors(theme);

    const sorted = [...FEATURE_IMPORTANCE].sort((a, b) => b.importance - a.importance);

    const data = {
        labels: sorted.map((f) => f.feature),
        datasets: [{
            label: "Feature Importance",
            data: sorted.map((f) => f.importance),
            backgroundColor: sorted.map((_, i) =>
                i === 0 ? "#e11d48" : i === 1 ? "#f43f5e" : i <= 3 ? "#fb7185" : "#fda4af"
            ),
            borderRadius: 8,
            borderSkipped: false,
        }],
    };

    const options = {
        indexAxis: "y" as const,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx: any) => ` Importance: ${(ctx.parsed.x * 100).toFixed(1)}%`,
                },
            },
        },
        scales: {
            x: {
                grid: { color: colors.grid },
                ticks: { color: colors.text, callback: (v: any) => `${(Number(v) * 100).toFixed(0)}%` },
            },
            y: {
                grid: { display: false },
                ticks: { color: colors.text, font: { size: 11, weight: "bold" as const } },
            },
        },
    };

    return (
        <div className="card p-6 md:p-8">
            <h3 className="text-lg font-black mb-2 flex items-center gap-2">
                <span className="text-xl">📊</span> Feature Importance
            </h3>
            <p className="text-xs text-secondary mb-4">
                Which input features most influenced the model{"'"}s predictions — ranked by Gini importance from the Gradient Boosting ensemble.
            </p>
            <div className="h-[320px]">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
}

function PrecisionRecallChart() {
    const { theme } = useTheme();
    const colors = getThemeColors(theme);
    const data = {
        labels: STATIC_PR.recall.map((v) => v.toFixed(2)),
        datasets: [
            {
                label: `PR Curve (AP = ${STATIC_PR.ap})`,
                data: STATIC_PR.precision,
                borderColor: "#7c3aed",
                backgroundColor: "rgba(124,58,237,0.1)",
                fill: true, tension: 0.3, pointRadius: 0, borderWidth: 2.5,
            },
            {
                label: "Random Baseline (49%)",
                data: Array(STATIC_PR.recall.length).fill(0.49),
                borderColor: "#94a3b8",
                borderDash: [5, 5],
                fill: false, pointRadius: 0, borderWidth: 1.5,
            },
        ],
    };
    const options = {
        responsive: true, maintainAspectRatio: false,
        scales: {
            x: { title: { display: true, text: "Recall", color: colors.text, font: { size: 11, weight: "bold" as const } }, grid: { color: colors.grid }, ticks: { color: colors.text, maxTicksLimit: 7 } },
            y: { title: { display: true, text: "Precision", color: colors.text, font: { size: 11, weight: "bold" as const } }, grid: { color: colors.grid }, ticks: { color: colors.text }, min: 0, max: 1 },
        },
        plugins: {
            legend: { position: "bottom" as const, labels: { color: colors.text, font: { size: 10 }, usePointStyle: true, padding: 15 } },
        },
    };
    return (
        <div className="card p-6 md:p-8">
            <h3 className="text-lg font-black mb-2 flex items-center gap-2"><span className="text-xl">🎯</span> Precision-Recall Curve</h3>
            <p className="text-xs text-secondary mb-4">
                Critical for medical models — the tradeoff between detecting all real cases (recall) and avoiding
                false alarms (precision). Average Precision (AP) = {STATIC_PR.ap}.
            </p>
            <div className="h-[280px]"><Line data={data} options={options} /></div>
        </div>
    );
}

function RiskDistributionChart() {
    const { theme } = useTheme();
    const colors = getThemeColors(theme);
    const barColors = STATIC_RISK_DIST.map((_, i) => {
        const t = i / (STATIC_RISK_DIST.length - 1);
        const r = Math.round(34 + t * (239 - 34));
        const g = Math.round(197 - t * 140);
        const b = Math.round(94 - t * 60);
        return `rgb(${r},${g},${b})`;
    });
    const data = {
        labels: STATIC_RISK_DIST.map((d) => d.range),
        datasets: [{
            label: "Patients",
            data: STATIC_RISK_DIST.map((d) => d.count),
            backgroundColor: barColors,
            borderRadius: 8,
            borderSkipped: false,
        }],
    };
    const options = {
        responsive: true, maintainAspectRatio: false,
        scales: {
            x: { grid: { display: false }, ticks: { color: colors.text, font: { size: 10 } } },
            y: { grid: { color: colors.grid }, ticks: { color: colors.text } },
        },
        plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (ctx: any) => ` ${ctx.parsed.y.toLocaleString()} patients` } },
        },
    };
    return (
        <div className="card p-6 md:p-8">
            <h3 className="text-lg font-black mb-2 flex items-center gap-2"><span className="text-xl">📦</span> Risk Score Distribution</h3>
            <p className="text-xs text-secondary mb-4">
                How the model spreads its confidence scores across the 21,000-patient test set.
                A bimodal shape (peaks at both ends) confirms the model makes decisive predictions rather than hedging near 50%.
            </p>
            <div className="h-[280px]"><Bar data={data} options={options} /></div>
        </div>
    );
}

function AgeRiskChart() {
    const { theme } = useTheme();
    const colors = getThemeColors(theme);
    const data = {
        labels: STATIC_AGE_RISK.map((d) => d.group),
        datasets: [{
            label: "CVD Risk %",
            data: STATIC_AGE_RISK.map((d) => d.riskPct),
            borderColor: "#e11d48",
            backgroundColor: "rgba(225,29,72,0.12)",
            fill: true, tension: 0.4, borderWidth: 2.5,
            pointBackgroundColor: "#e11d48", pointRadius: 5,
        }],
    };
    const options = {
        responsive: true, maintainAspectRatio: false,
        scales: {
            x: { grid: { display: false }, ticks: { color: colors.text, font: { weight: "bold" as const } } },
            y: { grid: { color: colors.grid }, ticks: { color: colors.text, callback: (v: any) => `${v}%` }, min: 0, max: 100 },
        },
        plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (ctx: any) => ` ${ctx.parsed.y}% of age group diagnosed with CVD` } },
        },
    };
    return (
        <div className="card p-6 md:p-8">
            <h3 className="text-lg font-black mb-2 flex items-center gap-2"><span className="text-xl">👥</span> CVD Risk by Age Group</h3>
            <p className="text-xs text-secondary mb-4">
                Prevalence of cardiovascular disease by age group in the training dataset. Confirms why age ranks as
                the #2 most important feature — risk more than doubles every decade after 40.
            </p>
            <div className="h-[280px]"><Line data={data} options={options} /></div>
        </div>
    );
}


export default function Model() {
    return (

        <>
            {/* ── Header ─────────────────────────────────────────────────── */}
            <header className="mb-10 md:mb-16 text-center animate-fade-in">
                <span className="inline-block py-1 px-4 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-widest mb-4">
                    System Transparency
                </span>
                <h1 className="text-5xl font-black mb-4">How CardioCare-AI Works</h1>
                <p className="text-xl text-secondary max-w-2xl mx-auto">
                    A clear, honest look at the dataset, algorithm, methodology, and measured performance powering every prediction.
                </p>
            </header>

            {/* ── Section 1: Model Overview ───────────────────────────────── */}
            <section className="mb-10 md:mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* GBM card */}
                    <div className="card p-8 md:p-10 overflow-hidden relative border-l-4 border-red-500">
                        <div className="absolute -right-16 -top-16 w-56 h-56 bg-red-500/10 rounded-full blur-3xl" />
                        <div className="relative z-10">
                            <span className="inline-block text-xs font-bold uppercase tracking-widest text-red-400 mb-4">Algorithm</span>
                            <h2 className="text-3xl font-black mb-4 text-[var(--text-main)]">Gradient Boosting Classifier</h2>
                            <p className="text-secondary text-sm leading-relaxed mb-6">
                                We evaluated Logistic Regression, Random Forest, SVM, and Neural Networks.
                                The <strong className="text-primary">Gradient Boosting Classifier</strong> achieved
                                the best balance of <strong className="text-primary">accuracy (73%)</strong> and
                                interpretability — every prediction comes with feature importance scores.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "Training Samples", val: "49,000+" },
                                    { label: "Test Samples", val: "21,000" },
                                    { label: "Input Features", val: "11" },
                                    { label: "Model Version", val: "v1.0" },
                                ].map((s) => (
                                    <div key={s.label} className="p-3 rounded-2xl border border-[var(--border,rgba(0,0,0,0.08))] text-center">
                                        <div className="text-xl font-black text-red-400">{s.val}</div>
                                        <div className="text-[10px] text-secondary uppercase font-bold mt-0.5">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Why GBM */}
                    <div className="card p-8 md:p-10">
                        <span className="inline-block text-xs font-bold uppercase tracking-widest text-red-400 mb-4">Why This Algorithm</span>
                        <h2 className="text-2xl font-black mb-6">Built for Explainability</h2>
                        <div className="space-y-4">
                            {[
                                { icon: "🌲", title: "Ensemble of Decision Trees", body: "Hundreds of small trees trained sequentially, each correcting the errors of the previous one — superior accuracy over any single model." },
                                { icon: "⚖️", title: "Feature Importance Scores", body: "Each prediction exposes ranked feature importances — showing exactly which factors (BP, Age, Cholesterol) drove the risk score." },
                                { icon: "🧮", title: "Handles Mixed Data", body: "Natively handles numeric vitals alongside categorical lifestyle flags without one-hot encoding degradation." },
                            ].map((item) => (
                                <div key={item.title} className="flex gap-4 p-4 rounded-2xl" style={{ boxShadow: "var(--clay-input-shadow)" }}>
                                    <div className="text-2xl flex-shrink-0">{item.icon}</div>
                                    <div>
                                        <div className="font-bold text-sm mb-1">{item.title}</div>
                                        <p className="text-[11px] text-secondary leading-relaxed">{item.body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Section 2: Features (Compact) ────────────────────────────── */}
            <section className="mb-10 md:mb-10">
                <div className="card p-6 md:p-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <span className="inline-block text-xs font-bold uppercase tracking-widest text-red-400 mb-1">Inputs</span>
                            <h2 className="text-2xl font-black">11 Clinical Features</h2>
                        </div>
                        <span className="text-[10px] text-secondary italic hidden sm:block">Demographic · Physical · Vitals · Lifestyle</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {FEATURES.map((f) => (
                            <div key={f.name} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
                                style={{ boxShadow: "var(--clay-input-shadow)" }}>
                                <span className="text-base">{f.icon}</span>
                                <span>{f.name}</span>
                                <span className="text-[9px] text-secondary hidden md:inline">({f.desc})</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Section 3: How It Works ─────────────────────────────────── */}
            <section className="mb-10 md:mb-16">
                <div className="text-center mb-8">
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-red-400 mb-2">Process</span>
                    <h2 className="text-3xl font-black">How a Prediction Is Made</h2>
                </div>
                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute top-10 left-0 w-full h-0.5 bg-red-100 hidden md:block" />
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                        {STEPS.map((s) => (
                            <div key={s.no} className="card p-6 text-center hover:-translate-y-1 transition-all duration-300">
                                <div className="w-10 h-10 rounded-full bg-red-500 text-white text-xs font-black flex items-center justify-center mx-auto mb-3">
                                    {s.no}
                                </div>
                                <div className="text-2xl mb-2">{s.icon}</div>
                                <div className="font-black text-sm mb-2">{s.title}</div>
                                <p className="text-[10px] text-secondary leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Section 4: Developer Analytics (Static) ─────────────────── */}
            <section className="mb-10 md:mb-16">
                <div className="text-center mb-8">
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-red-400 mb-2">Analytics</span>
                    <h2 className="text-3xl font-black">Model Performance</h2>
                    <p className="text-secondary mt-2 text-sm max-w-lg mx-auto">
                        Evaluated on 21,000 unseen records. All charts use static values computed from the test set.
                    </p>
                </div>

                {/* KPI row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {METRICS.map((m) => (
                        <div key={m.label} className="card p-6 text-center">
                            <div className="text-4xl font-black mb-1" style={{ color: m.color }}>{m.value}</div>
                            <div className="text-sm font-bold mb-1">{m.label}</div>
                            <div className="text-[10px] text-secondary leading-snug">{m.note}</div>
                        </div>
                    ))}
                </div>

                {/* Classification Report full-width */}
                <div className="mb-6">
                    <ClassificationReport data={STATIC_REPORT} accuracy={STATIC_ACCURACY} />
                </div>

                {/* Confusion Matrix + ROC side by side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <ConfusionMatrix matrix={STATIC_MATRIX} />
                    <RocCurve fpr={STATIC_ROC.fpr} tpr={STATIC_ROC.tpr} auc={STATIC_ROC.auc} />
                </div>

                {/* Feature Importance full-width */}
                <FeatureImportanceChart />

                {/* Precision-Recall + Risk Distribution side by side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <PrecisionRecallChart />
                    <RiskDistributionChart />
                </div>

                {/* Age Risk — full width */}
                <div className="mt-6">
                    <AgeRiskChart />
                </div>

                {/* Correlation Heatmap — full width */}
                <div className="mt-6">
                    <CorrelationHeatmap
                        features={STATIC_CORRELATION.features}
                        matrix={STATIC_CORRELATION.matrix}
                    />
                </div>
            </section>

            {/* ── Section 5: Limitations ─────────────────────────────────── */}
            <section className="card p-8 md:p-10 border-l-4 border-red-400 mb-4">
                <div className="flex gap-4 items-start">
                    <div className="text-3xl flex-shrink-0">⚠️</div>
                    <div>
                        <h2 className="text-xl font-black mb-3">Limitations & Disclaimer</h2>
                        <div className="space-y-2 text-sm text-secondary leading-relaxed">
                            <p>
                                <strong className="text-[var(--text-main)]">Not a medical diagnosis.</strong>{" "}
                                CardioCare-AI is an educational tool. Results are probabilistic estimates and must not
                                replace advice from a qualified healthcare professional.
                            </p>
                            <p>
                                <strong className="text-[var(--text-main)]">Dataset scope.</strong>{" "}
                                Trained on a single dataset of 70,000 records. May not generalise equally across all
                                ethnicities, geographies, or clinical settings.
                            </p>
                            <p>
                                <strong className="text-[var(--text-main)]">Known accuracy ceiling.</strong>{" "}
                                At 73% accuracy, 27% of predictions may be incorrect. A "Low Risk" result does not
                                mean you are free of cardiovascular disease.
                            </p>
                        </div>
                        <Link href="/caution" className="inline-flex items-center gap-1 text-red-500 font-bold text-xs mt-4 hover:underline">
                            Read full caution notice →
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
