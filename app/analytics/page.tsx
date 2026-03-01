"use client";

import React, { useEffect, useState } from "react";
import BodyAnalysis from "@/components/analytics/BodyAnalysis";
import SeverityMonitor from "@/components/analytics/SeverityMonitor";
import HealthRadar from "@/components/analytics/HealthRadar";
import VitalsCards from "@/components/analytics/VitalsCards";
import ModelMetrics from "@/components/analytics/ModelMetrics";
import ClassificationReport from "@/components/analytics/ClassificationReport";
import ConfusionMatrix from "@/components/analytics/ConfusionMatrix";
import RocCurve from "@/components/analytics/RocCurve";
import CorrelationHeatmap from "@/components/analytics/CorrelationHeatmap";

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

interface MetricsData {
    source: string;
    model: {
        type: string;
        accuracy: number;
        auc: number;
        dataset_size: number;
        test_size: number;
        features: string[];
        version: string;
    };
    classification_report: any;
    confusion_matrix: number[][];
    roc_curve: { fpr: number[]; tpr: number[]; auc: number };
    correlation_matrix: { features: string[]; matrix: number[][] };
}

export default function Analytics() {
    const [healthData, setHealthData] = useState<HealthData | null>(null);
    const [metricsData, setMetricsData] = useState<MetricsData | null>(null);
    const [devOpen, setDevOpen] = useState(false);
    const [devTab, setDevTab] = useState<'overview' | 'performance' | 'correlation'>('overview');
    const [metricsLoading, setMetricsLoading] = useState(false);
    const [metricsError, setMetricsError] = useState<string | null>(null);

    // Load health data from sessionStorage
    useEffect(() => {
        try {
            const saved = sessionStorage.getItem('heartsense_prediction');
            if (saved) setHealthData(JSON.parse(saved));
        } catch { /* ignore */ }
    }, []);

    // Fetch developer metrics when section opens
    useEffect(() => {
        if (!devOpen || metricsData) return;

        const fetchMetrics = async () => {
            setMetricsLoading(true);
            setMetricsError(null);
            try {
                const res = await fetch('/api/model-metrics');
                // 202 = background thread still computing — auto-retry after 3s
                if (res.status === 202) {
                    setMetricsError('Metrics are being computed on the server. Retrying in 3 seconds...');
                    setTimeout(() => {
                        setMetricsError(null);
                        setMetricsData(null); // triggers useEffect re-run
                    }, 3000);
                    return;
                }
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                setMetricsData(data);
            } catch (err: any) {
                setMetricsError(err.message || 'Failed to load metrics');
            } finally {
                setMetricsLoading(false);
            }
        };
        fetchMetrics();
    }, [devOpen, metricsData]);

    const tabs = [
        { key: 'overview', label: 'Overview' },
        { key: 'performance', label: 'Performance' },
        { key: 'correlation', label: 'Correlation' },
    ] as const;

    return (
        <>
            <header className="mb-8 md:mb-12 text-center animate-fade-in">
                <span className="inline-block py-1 px-4 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-widest mb-4">
                    Analytics Dashboard
                </span>
                <h1 className="text-4xl md:text-5xl font-black mb-3">Health Analytics</h1>
                <p className="text-lg text-secondary max-w-2xl mx-auto">
                    Your personalized health insights and advanced model analytics.
                </p>
            </header>

            {/* ════════════════════════════════════════════
                USER HEALTH INSIGHTS
            ════════════════════════════════════════════ */}
            {healthData ? (
                <div className="space-y-6 mb-12 animate-fade-in">
                    <h2 className="text-xl font-black flex items-center gap-2">
                        <span className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center text-sm">❤️</span>
                        Your Health Profile
                    </h2>

                    {/* Row 1: BMI + Severity */}
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
                </div>
            ) : (
                <div className="card p-12 text-center mb-12 animate-fade-in">
                    <div className="text-5xl mb-4">🫀</div>
                    <h3 className="text-xl font-black mb-2">No Prediction Data Yet</h3>
                    <p className="text-secondary mb-6 max-w-md mx-auto">
                        Make a prediction first to see your personalized health analytics, BMI analysis, and metric severity.
                    </p>
                    <a href="/predict" className="btn btn-primary inline-flex items-center gap-2">
                        <span>Go to Prediction</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                    </a>
                </div>
            )}

            {/* ════════════════════════════════════════════
                DEVELOPER ANALYTICS (Collapsible)
            ════════════════════════════════════════════ */}
            <div className="mb-8">
                <button
                    onClick={() => setDevOpen(!devOpen)}
                    className="w-full card p-5 flex items-center justify-between group hover:border-red-100 transition-colors"
                >
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm">🔬</span>
                        <div className="text-left">
                            <h2 className="text-lg font-black">Developer Analytics</h2>
                            <p className="text-xs text-secondary">Model performance, ROC curve, confusion matrix, correlation</p>
                        </div>
                    </div>
                    <svg
                        className={`w-5 h-5 text-secondary transition-transform duration-300 ${devOpen ? 'rotate-180' : ''}`}
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>
            </div>

            {devOpen && (
                <div className="space-y-6 animate-fade-in">
                    {/* Tabs */}
                    <div className="flex gap-2 flex-wrap">
                        {tabs.map((t) => (
                            <button
                                key={t.key}
                                onClick={() => setDevTab(t.key)}
                                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${devTab === t.key
                                    ? 'bg-red-500 text-white shadow-lg shadow-red-200'
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                    }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    {/* Loading / Error states */}
                    {metricsLoading && (
                        <div className="card p-12 text-center">
                            <div className="inline-block w-8 h-8 border-3 border-red-200 border-t-red-500 rounded-full animate-spin mb-4" />
                            <p className="text-secondary font-medium">Loading model metrics...</p>
                        </div>
                    )}

                    {metricsError && (
                        <div className="card p-8 text-center border-red-200">
                            <div className="text-3xl mb-3">⚠️</div>
                            <p className="text-red-500 font-bold mb-2">Failed to Load Metrics</p>
                            <p className="text-xs text-secondary mb-4">{metricsError}</p>
                            <button
                                onClick={() => { setMetricsData(null); setMetricsError(null); }}
                                className="btn btn-primary text-sm"
                            >
                                Retry
                            </button>
                        </div>
                    )}

                    {/* Tab Content */}
                    {metricsData && !metricsLoading && (
                        <>
                            {devTab === 'overview' && (
                                <div className="space-y-6">
                                    <ModelMetrics data={metricsData} />
                                    <ClassificationReport
                                        data={metricsData.classification_report}
                                        accuracy={metricsData.model.accuracy}
                                    />
                                </div>
                            )}

                            {devTab === 'performance' && (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <ConfusionMatrix matrix={metricsData.confusion_matrix} />
                                    <RocCurve
                                        fpr={metricsData.roc_curve.fpr}
                                        tpr={metricsData.roc_curve.tpr}
                                        auc={metricsData.roc_curve.auc}
                                    />
                                </div>
                            )}

                            {devTab === 'correlation' && (
                                <CorrelationHeatmap
                                    features={metricsData.correlation_matrix.features}
                                    matrix={metricsData.correlation_matrix.matrix}
                                />
                            )}
                        </>
                    )}
                </div>
            )}
        </>
    );
}
