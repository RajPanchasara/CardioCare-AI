import React from "react";

export default function Model() {
    return (
        <>
            <header className="mb-8 md:mb-16 text-center animate-fade-in">
                <span className="inline-block py-1 px-4 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-widest mb-4">Deep Transparency</span>
                <h1 className="text-5xl font-black mb-4">Model Architecture & Transparency</h1>
                <p className="text-xl text-secondary max-w-2xl mx-auto">A deep look into the Dataset, Preprocessing Pipeline,
                    and the logic
                    of the Gradient Boosting Classifier.</p>
            </header>

            {/* Pipeline Visual Flow */}
            <section className="mb-10 md:mb-20">
                <h2 className="text-2xl font-black mb-10 text-center">Inference Pipeline</h2>
                <div className="relative max-w-5xl mx-auto px-4">
                    {/* Connector Line (Desktop) */}
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-red-100 translate hidden md:block"></div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                        <div className="group">
                            <div className="card p-6 text-center transition-all group-hover:-translate-y-2">
                                <div className="text-3xl mb-3">📥</div>
                                <h4 className="font-bold text-sm mb-2">Ingestion</h4>
                                <p className="text-[12px] text-gray-400">Loading 70k+ Patient Records</p>
                            </div>
                            <div className="mt-4 hidden md:flex justify-center">
                                <div className="w-10 h-10 rounded-full bg-[var(--bg-card)] text-primary flex items-center justify-center font-bold"
                                    style={{ boxShadow: "var(--clay-btn-shadow)" }}>
                                    01</div>
                            </div>
                        </div>

                        <div className="group">
                            <div className="card p-6 text-center transition-all group-hover:-translate-y-2">
                                <div className="text-3xl mb-3">🧹</div>
                                <h4 className="font-bold text-sm mb-2">Cleaning</h4>
                                <p className="text-[12px] text-gray-400">Removing Outliers & Nulls</p>
                            </div>
                            <div className="mt-4 hidden md:flex justify-center">
                                <div className="w-10 h-10 rounded-full bg-[var(--bg-card)] text-primary flex items-center justify-center font-bold"
                                    style={{ boxShadow: "var(--clay-btn-shadow)" }}>
                                    02</div>
                            </div>
                        </div>

                        <div className="group">
                            <div className="card p-6 text-center transition-all group-hover:-translate-y-2">
                                <div className="text-3xl mb-3">⚙️</div>
                                <h4 className="font-bold text-sm mb-2">Refinement</h4>
                                <p className="text-[12px] text-gray-400">Scaling & Category Encoding</p>
                            </div>
                            <div className="mt-4 hidden md:flex justify-center">
                                <div className="w-10 h-10 rounded-full bg-[var(--bg-card)] text-primary flex items-center justify-center font-bold"
                                    style={{ boxShadow: "var(--clay-btn-shadow)" }}>
                                    03</div>
                            </div>
                        </div>

                        <div className="group">
                            <div className="card p-6 text-center transition-all group-hover:-translate-y-2">
                                <div className="text-3xl mb-3">🤖</div>
                                <h4 className="font-bold text-sm mb-2">Prediction</h4>
                                <p className="text-[12px] text-primary-light">Gradient Boosting Classifier</p>
                            </div>
                            <div className="mt-4 hidden md:flex justify-center">
                                <div className="w-10 h-10 rounded-full bg-[var(--bg-card)] text-primary flex items-center justify-center font-bold"
                                    style={{ boxShadow: "var(--clay-btn-shadow)" }}>
                                    04</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 md:mb-20">
                <div className="card p-10">
                    <h3 className="text-2xl font-black mb-8">Data Transformation Summary</h3>
                    <div className="space-y-8">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold uppercase tracking-widest text-red-400">Raw Data Retention</span>
                                <span className="text-sm font-black">70,000 → 68,748 Rows</span>
                            </div>
                            <div className="w-full bg-red-50 h-3 rounded-full overflow-hidden">
                                <div className="bg-primary h-full rounded-full" style={{ width: "98%" }}></div>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-2">Integrity Check: ~1.8% of data discarded due to
                                clinical outliers in BP readings.</p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 p-6 rounded-[2rem]" style={{ boxShadow: "var(--clay-input-shadow)" }}>
                            <div>
                                <div className="text-xs font-bold text-gray-400 uppercase mb-1">Feature Engineering</div>
                                <div className="text-2xl font-black text-gray-500">11 Features</div>
                                <p className="text-[10px] mt-1">Demos, Vitals, Lifestyle</p>
                            </div>
                            <div className="border-l border-pink-100 pl-6">
                                <div className="text-xs font-bold text-primary uppercase mb-1">Normalized State</div>
                                <div className="text-2xl font-black text-primary">11 Vectors</div>
                                <p className="text-[10px] mt-1 text-primary-dark">Scaled via StandardScaler</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card p-10 bg-slate-900 border-none text-white overflow-hidden relative">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                    <h3 className="text-2xl font-black mb-6 relative z-10">Why Gradient Boosting?</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8 relative z-10">
                        We evaluated multiple models including Logistic Regression, Random Forest, and Neural Networks.
                        The <strong>Gradient Boosting Classifier</strong> was chosen for the best balance of
                        <strong> accuracy (73%)</strong> and <strong>interpretability</strong>. Unlike black-box
                        neural networks, gradient boosting provides
                        <strong> feature importance scores</strong> for explainability:
                    </p>
                    <div className="space-y-4 relative z-10">
                        <div className="flex items-center gap-4 p-4 rounded-2xl border border-white/10"
                            style={{ boxShadow: "inset 2px 2px 5px rgba(0,0,0,0.5)" }}>
                            <div className="text-xl">🌲</div>
                            <div>
                                <h4 className="text-sm font-bold">Ensemble of Decision Trees</h4>
                                <p className="text-[10px] text-slate-500">Gradient Boosting combines hundreds of small decision trees sequentially, each correcting the errors of the previous one for superior accuracy.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl border border-white/10"
                            style={{ boxShadow: "inset 2px 2px 5px rgba(0,0,0,0.5)" }}>
                            <div className="text-xl">⚖️</div>
                            <div>
                                <h4 className="text-sm font-bold">Feature Importance for Explainability</h4>
                                <p className="text-[10px] text-slate-500">Each prediction comes with feature importance scores — showing exactly which factors (Blood Pressure, Age, Cholesterol) drove the risk assessment, unlike opaque neural networks.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Strategy Card */}
            <section className="card p-6 md:p-12 text-center">
                <h3 className="text-3xl font-black mb-10">Train–Test Validation Strategy</h3>
                <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-4 items-stretch md:h-20 mb-8">
                    <div className="flex-grow bg-primary text-white flex items-center justify-center font-black rounded-3xl h-16 md:h-full"
                        style={{ boxShadow: "var(--clay-btn-shadow)" }}>
                        TRAINING CORE (80%)
                    </div>
                    <div className="w-full md:w-32 bg-pink-100 text-primary flex items-center justify-center font-black rounded-3xl h-16 md:h-full"
                        style={{ boxShadow: "var(--clay-input-shadow)" }}>
                        TEST SET (20%)
                    </div>
                </div>
                <p className="text-secondary text-sm max-w-xl mx-auto italic">
                    Our model learned heart patterns from 56,250 patients and was strictly validated against 13,750 unseen
                    cases (based on confusion matrix summation) to ensure real-world reliability.
                </p>
            </section>
        </>
    );
}
