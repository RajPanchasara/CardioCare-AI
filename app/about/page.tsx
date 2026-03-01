/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

export default function About() {
    return (
        <>
            <header className="mb-8 md:mb-16 text-center animate-fade-in">
                <h1 className="text-5xl font-black mb-4">About CardioCare AI</h1>
                <p className="text-xl text-secondary max-w-3xl mx-auto">Bridging the gap between clinical data and preventive
                    cardiology through transparent, interpretable machine learning.</p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-10 md:mb-20">
                <div>
                    <h2 className="text-3xl font-black mb-6 text-[var(--text-main)] border-l-8 border-primary pl-6">
                        Understanding the
                        Silent Threat</h2>
                    <p className="text-secondary text-lg leading-relaxed mb-6">
                        Cardiovascular Disease (CVD) remains the world&apos;s leading killer, claiming approximately
                        <strong> 17.9 million lives annually</strong> (WHO, 2023). Accounting for nearly <strong>32% of all
                            global deaths</strong>,
                        these disorders often progress silently. The majority (85%) of these fatalities are due to heart
                        attacks and strokes —
                        events that are largely preventable with early detection.
                    </p>
                    <p className="text-secondary text-lg leading-relaxed">
                        <strong>CardioCare AI</strong> addresses this by shifting the paradigm from reactive treatment to
                        proactive risk
                        assessment. By training on a dataset of 70,000 patient records, our Gradient Boosting model identifies subtle
                        correlations between vitals (Blood Pressure, Cholesterol) and lifestyle habits to project risk levels
                        before clinical intervention becomes urgent.
                    </p>
                </div>
                <div className="relative md:h-full w-full">
                    <img src="/heart-landscape.png"
                        alt="AI-Driven Cardiovascular Health Visualization"
                        className="rounded-[2.5rem] shadow-2xl transition-all duration-700 hover:scale-[1.02] hover:shadow-cyan-500/20 w-full h-auto md:absolute md:inset-0 md:h-full md:w-full md:object-cover" />
                </div>
            </section>

            <section className="card p-6 md:p-12 mb-10 md:mb-20 text-center">
                <h3 className="text-3xl font-black mb-12 text-center">What Sets Us Apart?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="text-center">
                        <div className="text-4xl mb-4">🧬</div>
                        <h4 className="text-xl font-bold mb-3">Explainable AI</h4>
                        <p className="text-sm text-secondary">Every prediction comes with feature importance scores showing
                            exactly which factors — Blood Pressure, Age, Cholesterol — are driving the risk assessment.
                            Full transparency, not a black box.</p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl mb-4">🔬</div>
                        <h4 className="text-xl font-bold mb-3">Clinical Integrity</h4>
                        <p className="text-sm text-secondary">Trained on 70,000 verified patient records with standardized
                            physiological markers. Features include demographics, vitals, and lifestyle factors validated
                            against clinical research.</p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl mb-4">🤝</div>
                        <h4 className="text-xl font-bold mb-3">Decision Support</h4>
                        <p className="text-sm text-secondary">CardioCare AI is designed to augment, not replace, medical
                            expertise. It serves as a preliminary screening tool to help identify individuals who may benefit
                            from professional clinical review.</p>
                    </div>
                </div>
            </section>

            {/* Technology Stack */}
            <section className="card p-6 md:p-12  md:mb-20">
                <h3 className="text-3xl font-black mb-8 text-center">Technology Stack</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "Frontend", tech: "Next.js + React", icon: "⚛️" },
                        { label: "Backend", tech: "Flask + Python", icon: "🐍" },
                        { label: "ML Model", tech: "Scikit-Learn", icon: "🤖" },
                        { label: "Deployment", tech: "Vercel + Render", icon: "☁️" },
                    ].map((item, idx) => (
                        <div key={idx} className="text-center p-5 rounded-2xl" style={{ boxShadow: "var(--clay-input-shadow)" }}>
                            <div className="text-3xl mb-2">{item.icon}</div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{item.label}</div>
                            <div className="text-sm font-bold text-[var(--text-main)]">{item.tech}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="card p-8 md:p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <svg width="100%" height="100%" viewBox="0 0 100 100">
                        <path d="M0,50 Q25,20 50,50 T100,50" fill="none" stroke="#ef4444" strokeWidth="2" />
                    </svg>
                </div>
                <h3 className="text-3xl font-black mb-6 relative z-10 text-[var(--text-main)]">Ready to Explore?</h3>
                <p className="text-secondary max-w-2xl mx-auto text-lg mb-8 relative z-10">
                    Try the AI prediction tool, explore the model architecture, or get in touch to discuss collaboration opportunities.
                </p>
                <div className="flex justify-center gap-4 flex-wrap relative z-10">
                    <Link href="/predict" className="btn btn-primary">
                        Start Prediction
                    </Link>
                    <Link href="/contact" className="btn btn-outline">
                        Get in Touch
                    </Link>
                </div>
            </section>
        </>
    );
}
