"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import BodyAnalysis from "@/components/analytics/BodyAnalysis";
import SeverityMonitor from "@/components/analytics/SeverityMonitor";
import HealthRadar from "@/components/analytics/HealthRadar";
import VitalsCards from "@/components/analytics/VitalsCards";

type PredictionState = "IDLE" | "LOADING" | "SUCCESS";
type BackendState = "CHECKING" | "ONLINE" | "OFFLINE";


const LOADING_MESSAGES = [
    { icon: "🔗", text: "Connecting to CardioCare Neural Engine" },
    { icon: "🧬", text: "Preprocessing clinical parameters" },
    { icon: "🤖", text: "Running Gradient Boosting inference" },
    { icon: "📊", text: "Generating cardiovascular report" },
];

// Steps advance quickly (600→800→1200ms). Last step stays until backend responds.
// The progress bar fills proportionally and the whole component unmounts instantly on success.
function LoadingSteps() {
    const [step, setStep] = React.useState(0);
    const stepDelays = [600, 800, 1200]; // ms before advancing to next step

    React.useEffect(() => {
        if (step >= LOADING_MESSAGES.length - 1) return; // stay on last step
        const delay = stepDelays[step] || 1000;
        const id = setTimeout(() => setStep((s) => s + 1), delay);
        return () => clearTimeout(id);
    }, [step]);

    const msg = LOADING_MESSAGES[step];
    const progress = ((step + 1) / LOADING_MESSAGES.length) * 100;
    // On last step, cap at 90% — the final 10% fills when result arrives
    const barWidth = step >= LOADING_MESSAGES.length - 1 ? 90 : progress;

    return (
        <div className="flex flex-col items-center gap-4 min-h-[80px]">
            {/* Step indicators */}
            <div className="flex items-center gap-1.5">
                {LOADING_MESSAGES.map((_, i) => (
                    <div key={i} className={clsx(
                        "w-2 h-2 rounded-full transition-all duration-500",
                        i < step ? "bg-green-500 scale-100" :
                        i === step ? "bg-red-500 scale-125 animate-pulse" :
                        "bg-gray-300 scale-75"
                    )} />
                ))}
            </div>

            {/* Current step message */}
            <div className="flex items-center gap-2 text-secondary animate-pulse">
                <span className="text-xl">{msg.icon}</span>
                <span className="text-sm font-medium">{msg.text}</span>
            </div>

            {/* Progress bar */}
            <div className="w-56 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-red-500 to-rose-400 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${barWidth}%` }}
                />
            </div>

            {/* Completed steps */}
            <div className="flex flex-col gap-1 mt-1">
                {LOADING_MESSAGES.slice(0, step).map((m, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-green-600 font-medium">
                        <span>✓</span>
                        <span>{m.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Predict() {
    const [status, setStatus] = useState<PredictionState>("IDLE");
    const [backendStatus, setBackendStatus] = useState<BackendState>("CHECKING");
    const [result, setResult] = useState<any>(null);
    const [healthData, setHealthData] = useState<any>(null);
    const [formError, setFormError] = useState<string | null>(null);

    // Controlled BP state for real-time validation
    const [apHi, setApHi] = useState("");
    const [apLo, setApLo] = useState("");
    const [bpErrors, setBpErrors] = useState<{ apHi?: string; apLo?: string; cross?: string }>({});

    // Controlled checkbox state
    const [smoke, setSmoke] = useState(false);
    const [alco, setAlco] = useState(false);
    const [active, setActive] = useState(false);

    // Load previous prediction from sessionStorage on mount
    useEffect(() => {
        try {
            const saved = sessionStorage.getItem("heartsense_prediction");
            if (saved) {
                const parsed = JSON.parse(saved);
                setHealthData(parsed);
                setResult({
                    risk_label: parsed.risk_level,
                    probability: `${Number(parsed.probability).toFixed(1)}%`,
                    gauge_width: `${Number(parsed.probability).toFixed(1)}%`,
                    tips: parsed.tips || [],
                    bmi: parsed.bmi,
                    bmi_category: parsed.bmi_category,
                    model_version: "1.0",
                });
                setStatus("SUCCESS");
            }
        } catch { /* ignore */ }
    }, []);

    // Check backend health
    useEffect(() => {
        const check = async () => {
            try {
                const res = await fetch("/api/health");
                if (res.ok) { setBackendStatus("ONLINE"); return; }
            } catch { /* fall through */ }
            setTimeout(async () => {
                try {
                    const retry = await fetch("/api/health");
                    setBackendStatus(retry.ok ? "ONLINE" : "OFFLINE");
                } catch { setBackendStatus("OFFLINE"); }
            }, 2000);
        };
        check();
    }, []);

    const validateBP = (hi: string, lo: string) => {
        const errors: { apHi?: string; apLo?: string; cross?: string } = {};
        const hiN = Number(hi), loN = Number(lo);
        if (hi && (hiN < 80 || hiN > 200)) errors.apHi = "Systolic must be 80–200 mmHg";
        if (lo && (loN < 40 || loN > 140)) errors.apLo = "Diastolic must be 40–140 mmHg";
        if (hi && lo && hiN <= loN) errors.cross = "Systolic must be greater than Diastolic";
        setBpErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (backendStatus === "CHECKING") { setFormError("Verifying backend, please wait..."); return; }
        if (backendStatus === "OFFLINE") { setFormError("Cannot connect to AI Engine. Please ensure the backend is running."); return; }
        if (!validateBP(apHi, apLo)) return;
        setFormError(null);
        setStatus("LOADING");

        try {
            const formData = new FormData(e.currentTarget);
            const jsonData = {
                age: Number(formData.get("age")),
                gender: Number(formData.get("gender")),
                height: Number(formData.get("height")),
                weight: Number(formData.get("weight")),
                ap_hi: Number(apHi),
                ap_lo: Number(apLo),
                cholesterol: Number(formData.get("cholesterol")),
                gluc: Number(formData.get("gluc")),
                smoke: smoke ? 1 : 0,
                alco: alco ? 1 : 0,
                active: active ? 1 : 0,
            };

            const response = await fetch("/api/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jsonData),
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                const msg = typeof err.details === "object"
                    ? Object.values(err.details).join("\n")
                    : err.details || err.error || "Prediction failed";
                throw new Error(msg);
            }

            const data = await response.json();
            if (data.status === "error") throw new Error(data.message || "Backend logic error");

            const riskLabel = data.risk_level || data.result;
            const hd = {
                ap_hi: jsonData.ap_hi,
                ap_lo: jsonData.ap_lo,
                cholesterol: jsonData.cholesterol,
                gluc: jsonData.gluc,
                bmi: data.bmi,
                bmi_category: data.bmi_category,
                height: jsonData.height,
                weight: jsonData.weight,
                probability: data.probability,
                risk_level: riskLabel,
                tips: data.tips,
                timestamp: new Date().toISOString(),
            };
            sessionStorage.setItem("heartsense_prediction", JSON.stringify(hd));
            setHealthData(hd);

            setResult({
                risk_label: riskLabel,
                probability: `${data.probability.toFixed(1)}%`,
                gauge_width: `${data.probability.toFixed(1)}%`,
                tips: data.tips,
                bmi: data.bmi,
                bmi_category: data.bmi_category,
                feature_importance: data.feature_importance,
                model_version: data.model_version,
                response_time_ms: data.response_time_ms,
            });
            setStatus("SUCCESS");
        } catch (error: any) {
            setStatus("IDLE");
            setFormError(`Prediction Error: ${error.message || "Unknown error"}`);
        }
    };

    const riskColor = (label: string) => {
        if (label === "Low Risk") return { color: "#22c55e", bg: "#dcfce7" };
        if (label === "Moderate Risk") return { color: "#f59e0b", bg: "#fef3c7" };
        return { color: "#ef4444", bg: "#fee2e2" };
    };

    return (
        <div className="flex flex-col lg:flex-row gap-10">
            {/* ── Sidebar Form ──────────────────────────────────────────── */}
            <aside className="w-full lg:w-[360px] flex-shrink-0">
                <div className="card sticky">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold">Clinical Record</h3>
                    </div>

                    <form id="prediction-form" className="space-y-5" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1">Age (Years)</label>
                                <input type="number" name="age" required min="18" max="100"
                                    className="w-full p-2.5 rounded-xl border-none text-sm" placeholder="45" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1">Gender</label>
                                <select name="gender" className="w-full p-2.5 rounded-xl border-none text-sm">
                                    <option value="1">Female</option>
                                    <option value="2">Male</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1">Height (cm)</label>
                                <input type="number" name="height" required min="120" max="250"
                                    className="w-full p-2.5 rounded-xl border-none text-sm" placeholder="175" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1">Weight (kg)</label>
                                <input type="number" name="weight" step="0.1" required min="40" max="180"
                                    className="w-full p-2.5 rounded-xl border-none text-sm" placeholder="70" />
                            </div>
                        </div>

                        <div className="p-4 space-y-4" style={{ boxShadow: "var(--clay-input-shadow)", borderRadius: "var(--radius-md)" }}>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-bold uppercase text-red-500">Blood Pressure</span>
                                <span className="text-[10px] text-[var(--text-muted)] italic">Highly Critical</span>
                            </div>
                            <div>
                                <label className="block text-[9px] font-bold uppercase text-[var(--text-muted)] mb-1">Systolic (ap_hi)</label>
                                <input type="number" name="ap_hi" required min="80" max="200"
                                    value={apHi} onChange={(e) => { setApHi(e.target.value); validateBP(e.target.value, apLo); }}
                                    className={clsx("w-full p-2.5 rounded-xl text-sm transition-all", bpErrors.apHi ? "border-2 border-red-500 bg-red-50/30" : "border-none")}
                                    placeholder="120" />
                                {bpErrors.apHi && <p className="text-[10px] text-red-500 font-semibold mt-1 ml-1">{bpErrors.apHi}</p>}
                            </div>
                            <div>
                                <label className="block text-[9px] font-bold uppercase text-[var(--text-muted)] mb-1">Diastolic (ap_lo)</label>
                                <input type="number" name="ap_lo" required min="40" max="140"
                                    value={apLo} onChange={(e) => { setApLo(e.target.value); validateBP(apHi, e.target.value); }}
                                    className={clsx("w-full p-2.5 rounded-xl text-sm transition-all", bpErrors.apLo ? "border-2 border-red-500 bg-red-50/30" : "border-none")}
                                    placeholder="80" />
                                {bpErrors.apLo && <p className="text-[10px] text-red-500 font-semibold mt-1 ml-1">{bpErrors.apLo}</p>}
                            </div>
                            {bpErrors.cross && <p className="text-[10px] text-red-500 font-semibold ml-1">⚠️ {bpErrors.cross}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1">Cholesterol</label>
                                <select name="cholesterol" className="w-full p-2.5 rounded-xl border-none text-sm">
                                    <option value="1">Normal</option>
                                    <option value="2">Above Normal</option>
                                    <option value="3">Well Above Normal</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1">Glucose</label>
                                <select name="gluc" className="w-full p-2.5 rounded-xl border-none text-sm">
                                    <option value="1">Normal</option>
                                    <option value="2">Above Normal</option>
                                    <option value="3">Well Above Normal</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-3 pt-2">
                            {[
                                { key: "smoke", val: smoke, set: setSmoke, label: "Daily Smoking", color: "red" },
                                { key: "alco", val: alco, set: setAlco, label: "Frequent Alcohol", color: "amber" },
                                { key: "active", val: active, set: setActive, label: "Physically Active", color: "green" },
                            ].map(({ key, val, set, label, color }) => (
                                <label key={key}
                                    className={clsx("group flex items-center gap-3 p-3 rounded-xl transition-colors cursor-pointer border",
                                        val ? `bg-${color}-50 border-${color}-200` : "border-transparent hover:bg-red-50 hover:border-red-100")}>
                                    <input type="checkbox" checked={val} onChange={(e) => set(e.target.checked)}
                                        className="w-5 h-5 rounded cursor-pointer" style={{ accentColor: "var(--primary)" }} />
                                    <span className={clsx("text-sm font-medium", val ? `text-${color}-700` : "text-[var(--text-main)]")}>{label}</span>
                                    {val && <span className={`ml-auto text-[10px] font-bold text-${color}-600 bg-${color}-100 px-2 py-0.5 rounded-full`}>Active</span>}
                                </label>
                            ))}
                        </div>

                        {formError && (
                            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
                                ⚠️ {formError}
                            </div>
                        )}

                        <button type="submit" className="w-full btn btn-primary mt-4 py-4 group"
                            disabled={status === "LOADING" || backendStatus === "CHECKING"}>
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

            {/* ── Main Panel ────────────────────────────────────────────── */}
            <div className="flex-grow min-w-0">

                {/* IDLE */}
                {status === "IDLE" && (
                    <div className="card h-full min-h-[500px] flex flex-col items-center justify-center text-center p-6 md:p-12">
                        <div className="mb-8 relative">
                            <div className="text-7xl opacity-20">🫀</div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-32 h-32 border-2 border-pink-100 rounded-full animate-ping opacity-20" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-black text-gray-500 mb-4 uppercase tracking-wider">Awaiting Clinical Data</h2>
                        <p className="text-gray-400 max-w-sm leading-relaxed">
                            Fill in the health record on the left to begin the AI-powered cardiovascular assessment.
                        </p>
                    </div>
                )}

                {/* LOADING */}
                {status === "LOADING" && (
                    <div className="card h-full min-h-[500px] flex flex-col items-center justify-center p-8">
                        {/* Pulsing heart */}
                        <div className="relative mb-8">
                            <div className="text-7xl animate-pulse">🫀</div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-28 h-28 border-4 border-red-400/30 rounded-full animate-ping" />
                            </div>
                        </div>

                        {/* ECG line */}
                        <div className="w-full max-w-md h-20 relative mb-6 overflow-hidden">
                            <svg className="w-[200%] h-full animate-ecg-scroll" viewBox="0 0 200 20" preserveAspectRatio="none">
                                <path className="fill-none stroke-red-500 stroke-[1.5]" strokeLinecap="round" strokeLinejoin="round"
                                    d="M0,10 L10,10 L13,2 L17,18 L20,10 L30,10 L33,2 L37,18 L40,10 L50,10 L53,2 L57,18 L60,10 L70,10 L73,2 L77,18 L80,10 L90,10 L93,2 L97,18 L100,10 L110,10 L113,2 L117,18 L120,10 L130,10 L133,2 L137,18 L140,10 L150,10 L153,2 L157,18 L160,10 L170,10 L173,2 L177,18 L180,10 L200,10" />
                            </svg>
                        </div>

                        <h3 className="text-2xl font-bold mb-3">Analyzing Bio-Markers...</h3>

                        {/* Rotating status messages */}
                        <LoadingSteps />

                        <p className="text-secondary text-xs mt-6 max-w-xs text-center italic">
                            First prediction may take 30–60s if the AI engine is cold-starting.
                        </p>
                    </div>
                )}

                {/* SUCCESS */}
                {status === "SUCCESS" && result && (
                    <div className="animate-fade-in space-y-8">

                        {/* ── Section 2: Result Card ─────────────────────── */}
                        <div className="card overflow-hidden relative">
                            <div className="absolute -right-10 -bottom-10 text-[200px] opacity-[0.03] pointer-events-none">❤️</div>

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 relative z-10">
                                <div>
                                    <h2 className="text-4xl font-black">Cardiovascular Profile</h2>
                                    <p className="text-secondary text-sm">Assessed via Gradient Boosting Classifier — v{result.model_version || "1.0"}</p>
                                </div>
                                <div className="heartbeat text-6xl drop-shadow-md">❤️</div>
                            </div>

                            {/* Risk + Probability */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 relative z-10">
                                <div className="p-8 rounded-[2rem] text-center"
                                    style={{ background: riskColor(result.risk_label).bg }}>
                                    <span className="text-[11px] font-bold uppercase tracking-widest block mb-1"
                                        style={{ color: riskColor(result.risk_label).color }}>Model-Projected Risk</span>
                                    <div className="text-4xl font-black" style={{ color: riskColor(result.risk_label).color }}>
                                        {result.risk_label}
                                    </div>
                                </div>
                                <div className="p-8 rounded-[2rem] bg-gray-100 text-center">
                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Confidence Score</span>
                                    <div className="text-4xl font-black text-primary">{result.probability}</div>
                                </div>
                            </div>

                            {/* Risk gauge */}
                            <div className="space-y-2 relative z-10 mb-10">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter text-[var(--text-main)]">
                                    <span>Negative Outlook</span><span>Critical Concern</span>
                                </div>
                                <div className="gauge-container border-4 border-white shadow-sm h-6">
                                    <div className="gauge-fill shadow-lg" style={{ width: result.gauge_width }} />
                                </div>
                            </div>

                            {/* Tips */}
                            {result.tips && result.tips.length > 0 && (
                                <div className="card glass border-pink-100 p-6 relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold">Health Insights & Analysis</h3>
                                        {result.bmi && (
                                            <span className="text-sm font-bold bg-white/60 px-4 py-2 rounded-full shadow-sm">
                                                BMI: {result.bmi} ({result.bmi_category})
                                            </span>
                                        )}
                                    </div>
                                    <ul className="space-y-3">
                                        {result.tips.map((tip: any, idx: number) => (
                                            <li key={idx} className="flex gap-4 items-start text-sm bg-white/40 p-4 rounded-xl shadow-sm border border-white">
                                                <span className="text-2xl leading-none">{tip.icon}</span>
                                                <span className="leading-relaxed font-medium">{tip.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* ── Section 3: Action cards ───────────────────── */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="card bg-slate-900 text-white border-none p-6 md:p-8 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                        <span className="bg-primary/20 p-2 rounded-lg">🛡️</span> Medical Context
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                        This prediction is based on the interplay of your blood pressure and categorical markers.
                                        Even a "Low" score suggests value in preventive lifestyle management.
                                    </p>
                                </div>
                                <Link href="/guidance" className="btn btn-primary w-fit">Personalized Guidance</Link>
                            </div>
                            <div className="card glass border-pink-100 p-6 md:p-8 flex flex-col justify-center items-center text-center">
                                <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mb-4 text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                </div>
                                <h4 className="font-bold mb-2">Research Protocol</h4>
                                <p className="text-xs text-secondary leading-normal">
                                    Every result is validated against the UCI Heart Disease repository standard.
                                    This is not a diagnosis but a research-grade projection.
                                </p>
                            </div>
                        </div>

                        {/* ── Section 4: Health Analytics Charts ───────── */}
                        {healthData && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="inline-block py-1 px-3 rounded-full bg-red-100 text-red-600 text-[10px] font-bold uppercase tracking-widest mb-1">
                                            Personal Analytics
                                        </span>
                                        <h2 className="text-2xl font-black">Your Health Analytics</h2>
                                    </div>
                                    <button
                                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                        className="text-xs font-bold text-secondary hover:text-primary transition-colors"
                                    >
                                        ↑ Re-assess
                                    </button>
                                </div>

                                {/* BMI + Severity */}
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

                                {/* Radar + Vitals */}
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

                                <p className="text-center text-[11px] text-secondary italic pb-2">
                                    Analytics are based on your prediction stored in this browser session. Not a medical diagnosis.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
