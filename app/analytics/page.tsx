"use client";

import React, { useEffect, useState } from "react";
import BodyAnalysis from "@/components/analytics/BodyAnalysis";
import SeverityMonitor from "@/components/analytics/SeverityMonitor";
import HealthRadar from "@/components/analytics/HealthRadar";
import VitalsCards from "@/components/analytics/VitalsCards";
import Link from "next/link";

interface HealthData {
    ap_hi: number;
    ap_lo: number;
    cholesterol: number;
    gluc: number;
    bmi: number;
    bmi_category: string;
    height: number;
    weight: number;
    probability: number;
    risk_level: string;
}

export default function Analytics() {
    const [healthData, setHealthData] = useState<HealthData | null>(null);
    const [ready, setReady] = useState(false);

    // Load prediction data from sessionStorage on mount
    useEffect(() => {
        try {
            const saved = sessionStorage.getItem("heartsense_prediction");
            if (saved) setHealthData(JSON.parse(saved));
        } catch {
            /* ignore */
        } finally {
            setReady(true);
        }
    }, []);

    // Risk colour helper
    const riskColor = (level: string) => {
        if (level === "Low Risk") return { color: "#22c55e", bg: "#dcfce7" };
        if (level === "Moderate Risk") return { color: "#f59e0b", bg: "#fef3c7" };
        return { color: "#ef4444", bg: "#fee2e2" };
    };

    return (
        <>
            <header className="mb-8 md:mb-12 text-center animate-fade-in">
                <span className="inline-block py-1 px-4 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-widest mb-4">
                    Analytics Dashboard
                </span>
                <h1 className="text-4xl md:text-5xl font-black mb-3">Health Analytics</h1>
                <p className="text-lg text-secondary max-w-2xl mx-auto">
                    Your personalised health insights based on your latest prediction.
                </p>
            </header>

            {/* ── Empty state ─────────────────────────────────────────────── */}
            {ready && !healthData && (
                <div className="card p-12 text-center animate-fade-in">
                    <div className="text-6xl mb-6">🫀</div>
                    <h2 className="text-2xl font-black mb-3">No Prediction Data Available</h2>
                    <p className="text-secondary mb-8 max-w-md mx-auto">
                        Complete a health assessment first to see your personalised analytics,
                        BMI analysis, and metric severity charts.
                    </p>
                    <Link href="/predict" className="btn btn-primary inline-flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                        Start Health Assessment
                    </Link>
                </div>
            )}

            {/* ── Health charts (shown only after prediction) ─────────────── */}
            {healthData && (
                <div className="space-y-6 animate-fade-in">

                    {/* Risk summary banner */}
                    <div
                        className="card p-5 flex items-center gap-4"
                        style={{ borderLeft: `4px solid ${riskColor(healthData.risk_level).color}` }}
                    >
                        <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                            style={{ background: riskColor(healthData.risk_level).bg }}
                        >
                            {healthData.risk_level === "Low Risk" ? "✅" : healthData.risk_level === "Moderate Risk" ? "⚠️" : "🚨"}
                        </div>
                        <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-secondary mb-0.5">
                                Cardiovascular Risk Assessment
                            </div>
                            <div className="text-xl font-black" style={{ color: riskColor(healthData.risk_level).color }}>
                                {healthData.risk_level}
                            </div>
                            <div className="text-sm text-secondary">
                                Risk probability: <strong>{healthData.probability}%</strong>
                            </div>
                        </div>
                        <Link
                            href="/predict"
                            className="ml-auto text-xs font-bold text-secondary hover:text-primary transition-colors whitespace-nowrap"
                        >
                            Re-assess →
                        </Link>
                    </div>

                    {/* Row 1: BMI Ring + Severity Bars */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <BodyAnalysis
                            bmi={healthData.bmi}
                            bmiCategory={healthData.bmi_category}
                            height={healthData.height}
                            weight={healthData.weight}
                        />
                        <SeverityMonitor
                            systolic={healthData.ap_hi}
                            diastolic={healthData.ap_lo}
                            cholesterol={healthData.cholesterol}
                            glucose={healthData.gluc}
                            bmi={healthData.bmi}
                        />
                    </div>

                    {/* Row 2: Radar + Vitals */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <HealthRadar
                            systolic={healthData.ap_hi}
                            diastolic={healthData.ap_lo}
                            cholesterol={healthData.cholesterol}
                            glucose={healthData.gluc}
                            bmi={healthData.bmi}
                        />
                        <VitalsCards
                            systolic={healthData.ap_hi}
                            diastolic={healthData.ap_lo}
                            cholesterol={healthData.cholesterol}
                            glucose={healthData.gluc}
                            bmi={healthData.bmi}
                        />
                    </div>

                    {/* Disclaimer */}
                    <p className="text-center text-[11px] text-secondary italic pb-4">
                        Analytics are derived from your last prediction and stored locally in your browser.
                        They reset when you clear your session. This is not a medical diagnosis.
                    </p>
                </div>
            )}
        </>
    );
}
