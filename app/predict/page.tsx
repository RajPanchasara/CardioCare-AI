"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";

type PredictionState = "IDLE" | "LOADING" | "SUCCESS";
type BackendState = "CHECKING" | "ONLINE" | "OFFLINE";

export default function Predict() {
    const [status, setStatus] = useState<PredictionState>("IDLE");
    const [backendStatus, setBackendStatus] = useState<BackendState>("CHECKING");
    const [result, setResult] = useState<any>(null);
    const [formError, setFormError] = useState<string | null>(null);

    // Controlled BP state for real-time validation
    const [apHi, setApHi] = useState("");
    const [apLo, setApLo] = useState("");
    const [bpErrors, setBpErrors] = useState<{ apHi?: string; apLo?: string; cross?: string }>({});

    // Controlled checkbox state
    const [smoke, setSmoke] = useState(false);
    const [alco, setAlco] = useState(false);
    const [active, setActive] = useState(false);

    // Real-time BP validation
    const validateBP = (hi: string, lo: string) => {
        const errors: { apHi?: string; apLo?: string; cross?: string } = {};
        const hiNum = Number(hi);
        const loNum = Number(lo);
        if (hi && (hiNum < 80 || hiNum > 200)) {
            errors.apHi = "Systolic must be 80–200 mmHg";
        }
        if (lo && (loNum < 40 || loNum > 140)) {
            errors.apLo = "Diastolic must be 40–140 mmHg";
        }
        if (hi && lo && hiNum <= loNum) {
            errors.cross = "Systolic must be greater than Diastolic";
        }
        setBpErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleApHiChange = (val: string) => { setApHi(val); validateBP(val, apLo); };
    const handleApLoChange = (val: string) => { setApLo(val); validateBP(apHi, val); };

    // Check backend health on mount (with one retry after 2s)
    useEffect(() => {
        const checkBackend = async () => {
            try {
                const res = await fetch('/api/health');
                if (res.ok) {
                    setBackendStatus("ONLINE");
                } else {
                    // Retry once after 2 seconds before marking offline
                    setTimeout(async () => {
                        try {
                            const retry = await fetch('/api/health');
                            setBackendStatus(retry.ok ? "ONLINE" : "OFFLINE");
                        } catch {
                            setBackendStatus("OFFLINE");
                        }
                    }, 2000);
                }
            } catch {
                setTimeout(async () => {
                    try {
                        const retry = await fetch('/api/health');
                        setBackendStatus(retry.ok ? "ONLINE" : "OFFLINE");
                    } catch {
                        setBackendStatus("OFFLINE");
                    }
                }, 2000);
            }
        };
        checkBackend();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (backendStatus === "CHECKING") {
            setFormError("Verifying backend connection, please wait a moment...");
            return;
        }

        if (backendStatus === "OFFLINE") {
            setFormError("Cannot connect to the AI Engine. Please ensure the backend is running.");
            return;
        }

        setFormError(null);

        setStatus("LOADING");

        try {
            const formData = new FormData(e.currentTarget);

            // Manually construct JSON to handle checkboxes correctly
            // Client-side BP validation before sending
            if (!validateBP(apHi, apLo)) {
                setStatus("IDLE");
                return;
            }

            const jsonData = {
                age: Number(formData.get('age')),
                gender: Number(formData.get('gender')),
                height: Number(formData.get('height')),
                weight: Number(formData.get('weight')),
                ap_hi: Number(apHi),
                ap_lo: Number(apLo),
                cholesterol: Number(formData.get('cholesterol')),
                gluc: Number(formData.get('gluc')),
                smoke: smoke ? 1 : 0,
                alco: alco ? 1 : 0,
                active: active ? 1 : 0,
            };

            const response = await fetch('/api/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                let errorMessage = 'Prediction failed';
                if (errorData.details && typeof errorData.details === 'object') {
                    // Format per-field validation errors
                    errorMessage = Object.values(errorData.details).join('\n');
                } else {
                    errorMessage = errorData.details || errorData.error || errorMessage;
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();

            if (data.status === "error") {
                throw new Error(data.message || "Backend logic error");
            }

            const riskLabel = data.risk_level || data.result;
            let riskClass = "risk-low";
            if (riskLabel === "High Risk") riskClass = "risk-high";
            else if (riskLabel === "Moderate Risk") riskClass = "risk-moderate";

            setResult({
                risk_label: riskLabel,
                probability: `${data.probability.toFixed(1)}%`,
                risk_class: riskClass,
                gauge_width: `${data.probability.toFixed(1)}%`,
                tips: data.tips,
                bmi: data.bmi,
                bmi_category: data.bmi_category,
                feature_importance: data.feature_importance,
                model_version: data.model_version,
                response_time_ms: data.response_time_ms,
            });

            // Save health data for Analytics Dashboard
            sessionStorage.setItem('heartsense_prediction', JSON.stringify({
                ap_hi: Number(apHi),
                ap_lo: Number(apLo),
                cholesterol: Number(jsonData.cholesterol),
                gluc: Number(jsonData.gluc),
                bmi: data.bmi,
                bmi_category: data.bmi_category,
                height: Number(jsonData.height),
                weight: Number(jsonData.weight),
                probability: data.probability,
                risk_level: riskLabel,
                tips: data.tips,
                timestamp: new Date().toISOString(),
            }));

            setStatus("SUCCESS");
        } catch (error: any) {
            console.error("Error:", error);
            setStatus("IDLE");
            setFormError(`Prediction Error: ${error.message || "Unknown error"}`);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar Form: All Dataset Features */}
            <aside className="w-full lg:w-[360px] flex-shrink-0">
                <div className="card sticky">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold">Clinical Record</h3>
                        </div>
                    </div>

                    <form id="prediction-form" className="space-y-5" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1">Age
                                    (Years)</label>
                                <input type="number" name="age" required min="18" max="100"
                                    className="w-full p-2.5 rounded-xl border-none text-sm" placeholder="45" />
                            </div>
                            <div>
                                <label
                                    className="block text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1">Gender</label>
                                <select name="gender" className="w-full p-2.5 rounded-xl border-none text-sm">
                                    <option value="1">Female</option>
                                    <option value="2">Male</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1">Height
                                    (cm)</label>
                                <input type="number" name="height" required min="120" max="250"
                                    className="w-full p-2.5 rounded-xl border-none text-sm" placeholder="175" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1">Weight
                                    (kg)</label>
                                <input type="number" name="weight" step="0.1" required min="40" max="180"
                                    className="w-full p-2.5 rounded-xl border-none text-sm" placeholder="70" />
                            </div>
                        </div>

                        <div className="p-4 space-y-4"
                            style={{ boxShadow: "var(--clay-input-shadow)", borderRadius: "var(--radius-md)" }}>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-bold uppercase text-red-500">Blood Pressure</span>
                                <span className="text-[10px] text-[var(--text-muted)] italic">Highly Critical</span>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label
                                        className="block text-[9px] font-bold uppercase text-[var(--text-muted)] mb-1">Systolic
                                        (ap_hi)</label>
                                    <input type="number" name="ap_hi" required min="80" max="200"
                                        value={apHi}
                                        onChange={(e) => handleApHiChange(e.target.value)}
                                        className={clsx("w-full p-2.5 rounded-xl text-sm shadow-sm transition-all", bpErrors.apHi ? "border-2 border-red-500 bg-red-50/30" : "border-none")}
                                        placeholder="120" />
                                    {bpErrors.apHi && <p className="text-[10px] text-red-500 font-semibold mt-1 ml-1">{bpErrors.apHi}</p>}
                                </div>
                                <div>
                                    <label
                                        className="block text-[9px] font-bold uppercase text-[var(--text-muted)] mb-1">Diastolic
                                        (ap_lo)</label>
                                    <input type="number" name="ap_lo" required min="40" max="140"
                                        value={apLo}
                                        onChange={(e) => handleApLoChange(e.target.value)}
                                        className={clsx("w-full p-2.5 rounded-xl text-sm shadow-sm transition-all", bpErrors.apLo ? "border-2 border-red-500 bg-red-50/30" : "border-none")}
                                        placeholder="80" />
                                    {bpErrors.apLo && <p className="text-[10px] text-red-500 font-semibold mt-1 ml-1">{bpErrors.apLo}</p>}
                                </div>
                                {bpErrors.cross && <p className="text-[10px] text-red-500 font-semibold mt-0 ml-1">⚠️ {bpErrors.cross}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    className="block text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1">Cholesterol</label>
                                <select name="cholesterol" className="w-full p-2.5 rounded-xl border-none text-sm">
                                    <option value="1">Normal</option>
                                    <option value="2">Above Normal</option>
                                    <option value="3">Well Above Normal</option>
                                </select>
                            </div>
                            <div>
                                <label
                                    className="block text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1">Glucose</label>
                                <select name="gluc" className="w-full p-2.5 rounded-xl border-none text-sm">
                                    <option value="1">Normal</option>
                                    <option value="2">Above Normal</option>
                                    <option value="3">Well Above Normal</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-3 pt-2">
                            <label
                                className={clsx("group flex items-center gap-3 p-3 rounded-xl transition-colors cursor-pointer border", smoke ? "bg-red-50 border-red-200" : "border-transparent hover:bg-red-50 hover:border-red-100")}>
                                <input type="checkbox" checked={smoke} onChange={(e) => setSmoke(e.target.checked)}
                                    className="w-5 h-5 rounded cursor-pointer" style={{ accentColor: "var(--primary)" }} />
                                <span className={clsx("text-sm font-medium", smoke ? "text-red-600" : "text-[var(--text-main)] group-hover:text-gray-900")}>Daily
                                    Smoking</span>
                                {smoke && <span className="ml-auto text-[10px] font-bold text-red-500 bg-red-100 px-2 py-0.5 rounded-full">Active</span>}
                            </label>
                            <label
                                className={clsx("group flex items-center gap-3 p-3 rounded-xl transition-colors cursor-pointer border", alco ? "bg-amber-50 border-amber-200" : "border-transparent hover:bg-red-50 hover:border-red-100")}>
                                <input type="checkbox" checked={alco} onChange={(e) => setAlco(e.target.checked)}
                                    className="w-5 h-5 rounded cursor-pointer" style={{ accentColor: "var(--primary)" }} />
                                <span className={clsx("text-sm font-medium", alco ? "text-amber-700" : "text-[var(--text-main)] group-hover:text-gray-900")}>Frequent
                                    Alcohol</span>
                                {alco && <span className="ml-auto text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">Active</span>}
                            </label>
                            <label
                                className={clsx("group flex items-center gap-3 p-3 rounded-xl transition-colors cursor-pointer border", active ? "bg-green-50 border-green-200" : "border-transparent hover:bg-red-50 hover:border-red-100")}>
                                <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)}
                                    className="w-5 h-5 rounded cursor-pointer" style={{ accentColor: "var(--primary)" }} />
                                <span className={clsx("text-sm font-medium", active ? "text-green-700" : "text-[var(--text-main)] group-hover:text-gray-900")}>Physically
                                    Active</span>
                                {active && <span className="ml-auto text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Active</span>}
                            </label>
                        </div>

                        {formError && (
                            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
                                ⚠️ {formError}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full btn btn-primary mt-4 py-4 group"
                            disabled={status === "LOADING" || backendStatus === "CHECKING"}
                        >
                            <span>{status === "LOADING" ? "Analyzing..." : "Analyze Heart Health"}</span>
                            <svg className="group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg"
                                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </button>
                    </form>
                </div>
            </aside>

            <div className="flex-grow">
                {/* Initial State */}
                {status === "IDLE" && (
                    <div id="initial-state"
                        className="card h-full min-h-[500px] flex flex-col items-center justify-center text-center p-6 md:p-12">
                        <div className="mb-8 relative">
                            <div className="text-7xl opacity-20">🫀</div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-32 h-32 border-2 border-pink-100 rounded-full animate-ping opacity-20"></div>
                            </div>
                        </div>
                        <h2 className="text-3xl font-black text-gray-500 mb-4 uppercase tracking-wider">Awaiting Clinical Data</h2>
                        <p className="text-gray-400 max-w-sm leading-relaxed">
                            Fill in the electronic health record on the left to begin the AI-powered cardiovascular assessment.
                        </p>
                    </div>
                )}

                {/* Processing State (ECG Animation) */}
                {status === "LOADING" && (
                    <div id="processing-state"
                        className="card h-full min-h-[500px] flex flex-col items-center justify-center bg-[var(--bg-card)]">
                        <div className="w-full max-w-md h-32 relative mb-8">
                            <svg className="w-full h-full" viewBox="0 0 100 20">
                                <path className="ecg-line fill-none stroke-red-500 stroke-2"
                                    d="M0,10 L10,10 L13,2 L17,18 L20,10 L30,10 L33,2 L37,18 L40,10 L50,10 L53,2 L57,18 L60,10 L70,10 L73,2 L77,18 L80,10 L100,10" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Bio-Markers...</h3>
                        <p className="text-secondary animate-pulse italic">Connecting to HeartSense Neural Engine</p>
                    </div>
                )}

                {/* Result State */}
                {status === "SUCCESS" && result && (
                    <div id="prediction-result" className="animate-fade-in space-y-8 h-full">
                        <div className="card overflow-hidden relative">
                            {/* Heart Background Ornament */}
                            <div className="absolute -right-10 -bottom-10 text-[200px] opacity-[0.03] pointer-events-none">❤️</div>

                            <div
                                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative z-10">
                                <div>
                                    <h2 className="text-4xl font-black text-[var(--text-main)]">Cardiovascular Profile</h2>
                                    <p className="text-secondary text-sm">Assessed via Gradient Boosting Classifier — v{result.model_version || "1.0"}</p>
                                </div>
                                <div id="result-heart" className="heartbeat text-6xl drop-shadow-md">❤️</div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 relative z-10">
                                <div className="p-8 rounded-[2rem] bg-gray-100 shadow-inner text-center">
                                    <span
                                        className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Model-Projected
                                        Risk</span>
                                    <div id="risk-label" className="text-5xl font-black">{result.risk_label}</div>
                                </div>
                                <div className="p-8 rounded-[2rem] bg-gray-100 border border-white shadow-inner text-center">
                                    <span
                                        className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Confidence
                                        Score</span>
                                    <div id="probability-text" className="text-5xl font-black text-primary">{result.probability}</div>
                                </div>
                            </div>

                            {result.bmi && (
                                <div className="card glass border-pink-100 p-6 md:p-8 relative z-10 mb-12">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold">Health Insights & Analysis</h3>
                                        <span className="text-sm font-bold bg-white/60 px-4 py-2 rounded-full shadow-sm">
                                            BMI: {result.bmi} ({result.bmi_category})
                                        </span>
                                    </div>
                                    {result.tips && result.tips.length > 0 && (
                                        <ul className="space-y-4">
                                            {result.tips.map((tip: any, idx: number) => (
                                                <li key={idx} className="flex gap-4 items-start text-sm text-[var(--text-main)] bg-white/40 p-4 rounded-xl shadow-sm border border-white">
                                                    <span className="text-2xl leading-none">{tip.icon}</span>
                                                    <span className="leading-relaxed font-medium">{tip.text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}

                            <div className="space-y-4 relative z-10">
                                <div
                                    className="flex justify-between items-center text-[10px] font-black uppercase text-[var(--text-main)] tracking-tighter">
                                    <span>Negative Outlook</span>
                                    <span>Critical Concern</span>
                                </div>
                                <div className="gauge-container border-4 border-white shadow-sm h-6">
                                    <div id="gauge-fill" className="gauge-fill shadow-lg" style={{ width: result.gauge_width }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="card bg-slate-900 text-white border-none p-6 md:p-8 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <span className="bg-primary/20 p-2 rounded-lg">🛡️</span>
                                        <span className="text-xl font-bold">Medical Context</span>
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                        This prediction is based on the complex interplay of your blood pressure and categorical
                                        markers. Even a &quot;Low&quot; score suggests the value of preventive lifestyle management.
                                    </p>
                                </div>
                                <Link id="view-guidance" href="/guidance" className="btn btn-primary w-fit">
                                    Personalized Guidance
                                </Link>
                            </div>

                            <div className="card glass border-pink-100 p-6 md:p-8 flex flex-col justify-center items-center text-center">
                                <div
                                    className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                </div>
                                <h4 className="font-bold mb-2">Research Protocol</h4>
                                <p className="text-xs text-secondary leading-normal">
                                    Every result is validated against the UCI Heart Disease repository standard. This is not a
                                    diagnosis but a research-grade projection.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
