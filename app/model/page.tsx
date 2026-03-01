import React from "react";
import Link from "next/link";

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
    { icon: "🏃", name: "Physical Activity", desc: "Yes / No", group: "Lifestyle" },
];

const STEPS = [
    { no: "01", icon: "📝", title: "Input", desc: "You fill in 11 clinical and lifestyle fields in the prediction form." },
    { no: "02", icon: "✅", title: "Validate", desc: "Each field is checked for valid ranges and cross-field rules (e.g. systolic > diastolic)." },
    { no: "03", icon: "⚙️", title: "Scale", desc: "Values are transformed using the same StandardScaler fitted on 70,000 training records." },
    { no: "04", icon: "🤖", title: "Predict", desc: "The Gradient Boosting Classifier outputs a probability score and 3-tier risk classification." },
];

const METRICS = [
    { label: "Accuracy", value: "73%", note: "On 21,000 held-out test records", color: "#e11d48" },
    { label: "AUC-ROC", value: "0.80", note: "Area under the ROC curve", color: "#7c3aed" },
    { label: "Precision (High Risk)", value: "77%", note: "Of predicted high-risk, 77% confirmed", color: "#0284c7" },
    { label: "Recall (High Risk)", value: "65%", note: "65% of actual high-risk cases caught", color: "#059669" },
];

export default function Model() {
    return (
        <>
            {/* ── Header ───────────────────────────────────────────────────── */}
            <header className="mb-10 md:mb-16 text-center animate-fade-in">
                <span className="inline-block py-1 px-4 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-widest mb-4">
                    System Transparency
                </span>
                <h1 className="text-5xl font-black mb-4">How CardioCare-AI Works</h1>
                <p className="text-xl text-secondary max-w-2xl mx-auto">
                    A clear, honest look at the dataset, algorithm, and methodology powering every prediction.
                </p>
            </header>

            {/* ── Section 1: Model Overview ────────────────────────────────── */}
            <section className="mb-10 md:mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* GBM card */}
                    <div className="card p-8 md:p-10 bg-slate-900 border-none text-white overflow-hidden relative">
                        <div className="absolute -right-16 -top-16 w-56 h-56 bg-red-500/10 rounded-full blur-3xl" />
                        <div className="relative z-10">
                            <span className="inline-block text-xs font-bold uppercase tracking-widest text-red-400 mb-4">Algorithm</span>
                            <h2 className="text-3xl font-black mb-4">Gradient Boosting Classifier</h2>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                We evaluated Logistic Regression, Random Forest, SVM, and Neural Networks.
                                The <strong className="text-white">Gradient Boosting Classifier</strong> achieved the best
                                balance of <strong className="text-white">accuracy (73%)</strong> and interpretability —
                                providing feature importance scores so every prediction is explainable, not a black box.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "Training Samples", val: "49,000+" },
                                    { label: "Test Samples", val: "21,000" },
                                    { label: "Input Features", val: "11" },
                                    { label: "Model Version", val: "v1.0" },
                                ].map((s) => (
                                    <div key={s.label} className="p-3 rounded-2xl border border-white/10 text-center">
                                        <div className="text-xl font-black text-red-400">{s.val}</div>
                                        <div className="text-[10px] text-slate-500 uppercase font-bold mt-0.5">{s.label}</div>
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
                                { icon: "🌲", title: "Ensemble of Decision Trees", body: "Hundreds of small trees trained sequentially, each correcting the errors of the previous one — resulting in superior accuracy over any single tree." },
                                { icon: "⚖️", title: "Feature Importance Scores", body: "Each prediction includes ranked feature importances — showing exactly which factors (Blood Pressure, Age, Cholesterol) drove the risk score." },
                                { icon: "🧮", title: "Handles Mixed Data", body: "Natively handles numeric vitals alongside categorical lifestyle flags without manual one-hot encoding degradation." },
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

            {/* ── Section 2: Features Used ─────────────────────────────────── */}
            <section className="mb-10 md:mb-16">
                <div className="text-center mb-8">
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-red-400 mb-2">Inputs</span>
                    <h2 className="text-3xl font-black">11 Clinical Features</h2>
                    <p className="text-secondary mt-2 text-sm max-w-lg mx-auto">
                        Three categories of patient data — demographics, vitals, and lifestyle — all validated before inference.
                    </p>
                </div>
                {(["Demographic", "Physical", "Vitals", "Lifestyle"] as const).map((group) => {
                    const items = FEATURES.filter((f) => f.group === group);
                    return (
                        <div key={group} className="mb-6">
                            <div className="text-[11px] font-black uppercase tracking-widest text-secondary mb-3 pl-1">{group}</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {items.map((f) => (
                                    <div key={f.name} className="card p-4 flex items-center gap-4">
                                        <div className="text-2xl w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 flex-shrink-0">
                                            {f.icon}
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm">{f.name}</div>
                                            <div className="text-[10px] text-secondary">{f.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* ── Section 3: How Prediction Works ─────────────────────────── */}
            <section className="mb-10 md:mb-16">
                <div className="text-center mb-8">
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-red-400 mb-2">Process</span>
                    <h2 className="text-3xl font-black">How a Prediction Is Made</h2>
                </div>
                <div className="relative max-w-4xl mx-auto">
                    {/* Connector line desktop */}
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

            {/* ── Section 4: Static Performance ────────────────────────────── */}
            <section className="mb-10 md:mb-16">
                <div className="text-center mb-8">
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-red-400 mb-2">Performance</span>
                    <h2 className="text-3xl font-black">Model Performance</h2>
                    <p className="text-secondary mt-2 text-sm max-w-lg mx-auto">
                        Evaluated on 21,000 unseen patient records using stratified 70/30 train–test split.
                    </p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {METRICS.map((m) => (
                        <div key={m.label} className="card p-6 text-center">
                            <div className="text-4xl font-black mb-1" style={{ color: m.color }}>{m.value}</div>
                            <div className="text-sm font-bold mb-1">{m.label}</div>
                            <div className="text-[10px] text-secondary leading-snug">{m.note}</div>
                        </div>
                    ))}
                </div>
                {/* Train/test bar */}
                <div className="card p-6 md:p-10 text-center">
                    <h3 className="text-xl font-black mb-6">Train–Test Validation Strategy</h3>
                    <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-3 h-auto md:h-16 mb-6">
                        <div className="flex-grow bg-primary text-white flex items-center justify-center font-black rounded-3xl h-14 md:h-full"
                            style={{ boxShadow: "var(--clay-btn-shadow)" }}>
                            TRAINING SET (70%) — 49,000 patients
                        </div>
                        <div className="w-full md:w-40 bg-red-100 text-primary flex items-center justify-center font-black rounded-3xl h-14 md:h-full"
                            style={{ boxShadow: "var(--clay-input-shadow)" }}>
                            TEST SET (30%) — 21,000
                        </div>
                    </div>
                    <p className="text-secondary text-sm max-w-xl mx-auto">
                        The model never saw the test set during training. Random seed 42 ensures reproducibility.
                    </p>
                </div>
            </section>

            {/* ── Section 5: Limitations & Disclaimer ─────────────────────── */}
            <section className="card p-8 md:p-10 border-l-4 border-red-400 mb-4">
                <div className="flex gap-4 items-start">
                    <div className="text-3xl flex-shrink-0">⚠️</div>
                    <div>
                        <h2 className="text-xl font-black mb-3">Limitations & Disclaimer</h2>
                        <div className="space-y-2 text-sm text-secondary leading-relaxed">
                            <p>
                                <strong className="text-[var(--text-main)]">Not a medical diagnosis.</strong>{" "}
                                CardioCare-AI is an educational and research tool. Results are probabilistic estimates and
                                should never replace advice from a qualified healthcare professional.
                            </p>
                            <p>
                                <strong className="text-[var(--text-main)]">Dataset scope.</strong>{" "}
                                The model was trained on a single dataset of 70,000 records. It may not generalise equally
                                well across all ethnicities, geographies, or clinical settings.
                            </p>
                            <p>
                                <strong className="text-[var(--text-main)]">Known accuracy ceiling.</strong>{" "}
                                At 73% accuracy, 27% of predictions may be incorrect. A "Low Risk" result does not mean
                                you are free of cardiovascular disease.
                            </p>
                            <p>
                                <strong className="text-[var(--text-main)]">Always consult a doctor</strong> for formal
                                cardiovascular risk assessment, especially if you have symptoms or a family history of heart disease.
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
