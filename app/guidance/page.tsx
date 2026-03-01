import Link from "next/link";

export default function Guidance() {
    return (
        <>
            <header className="mb-8 md:mb-16 text-center animate-fade-in">
                <span className="inline-block py-1 px-4 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest mb-4">
                    Evidence-Based
                </span>
                <h1 className="text-5xl font-black mb-4">Heart Health Guidance</h1>
                <p className="text-xl text-secondary max-w-2xl mx-auto">
                    Actionable, research-backed recommendations to reduce cardiovascular risk and improve heart health.
                </p>
            </header>

            {/* Key Stats */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-16">
                <div className="card p-5 text-center">
                    <div className="text-3xl font-black text-primary">17.9M</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Annual CVD Deaths</div>
                </div>
                <div className="card p-5 text-center">
                    <div className="text-3xl font-black text-green-600">80%</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Preventable</div>
                </div>
                <div className="card p-5 text-center">
                    <div className="text-3xl font-black text-blue-600">150</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Min/Week Exercise</div>
                </div>
                <div className="card p-5 text-center">
                    <div className="text-3xl font-black text-amber-600">{"<"}2.3g</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Daily Sodium</div>
                </div>
            </section>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 mb-10 md:mb-16">

                {/* Diet */}
                <section className="card p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-xl">🥗</div>
                        <h2 className="text-2xl font-black">Heart-Healthy Diet</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="flex gap-3 items-start p-4 rounded-xl bg-green-50/50" style={{ boxShadow: "var(--clay-input-shadow)" }}>
                            <span className="text-lg mt-0.5">✅</span>
                            <div>
                                <h4 className="font-bold text-sm mb-1">DASH Diet Approach</h4>
                                <p className="text-xs text-secondary leading-relaxed">Rich in fruits, vegetables, whole grains, and lean proteins. Studies show the DASH diet can reduce systolic blood pressure by 8–14 mmHg.</p>
                            </div>
                        </div>
                        <div className="flex gap-3 items-start p-4 rounded-xl bg-green-50/50" style={{ boxShadow: "var(--clay-input-shadow)" }}>
                            <span className="text-lg mt-0.5">✅</span>
                            <div>
                                <h4 className="font-bold text-sm mb-1">Omega-3 Fatty Acids</h4>
                                <p className="text-xs text-secondary leading-relaxed">Consume fatty fish (salmon, mackerel) 2–3 times per week. Omega-3s reduce triglycerides by 15–30% and lower inflammation markers.</p>
                            </div>
                        </div>
                        <div className="flex gap-3 items-start p-4 rounded-xl bg-red-50/50" style={{ boxShadow: "var(--clay-input-shadow)" }}>
                            <span className="text-lg mt-0.5">❌</span>
                            <div>
                                <h4 className="font-bold text-sm mb-1">Limit Saturated Fats</h4>
                                <p className="text-xs text-secondary leading-relaxed">Keep saturated fat below 6% of daily calories. Replace butter with olive oil. Avoid trans fats entirely — they raise LDL cholesterol by up to 10%.</p>
                            </div>
                        </div>
                        <div className="flex gap-3 items-start p-4 rounded-xl bg-amber-50/50" style={{ boxShadow: "var(--clay-input-shadow)" }}>
                            <span className="text-lg mt-0.5">⚠️</span>
                            <div>
                                <h4 className="font-bold text-sm mb-1">Reduce Sodium</h4>
                                <p className="text-xs text-secondary leading-relaxed">AHA recommends no more than 2,300 mg/day (ideally 1,500 mg). Excess sodium increases blood pressure by retaining fluid.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Exercise */}
                <section className="card p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl">🏃</div>
                        <h2 className="text-2xl font-black">Physical Activity</h2>
                    </div>
                    <div className="space-y-5">
                        <div className="p-5 rounded-2xl" style={{ boxShadow: "var(--clay-input-shadow)" }}>
                            <div className="flex justify-between items-center mb-3">
                                <h4 className="font-bold text-sm">Aerobic Exercise</h4>
                                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">AHA Guideline</span>
                            </div>
                            <p className="text-xs text-secondary leading-relaxed mb-3">At least 150 minutes per week of moderate-intensity (brisk walking) or 75 minutes of vigorous-intensity activity (running, cycling).</p>
                            <div className="flex gap-2">
                                <span className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold">Walking</span>
                                <span className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold">Swimming</span>
                                <span className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold">Cycling</span>
                            </div>
                        </div>
                        <div className="p-5 rounded-2xl" style={{ boxShadow: "var(--clay-input-shadow)" }}>
                            <h4 className="font-bold text-sm mb-2">Strength Training</h4>
                            <p className="text-xs text-secondary leading-relaxed">Muscle-strengthening activities at least 2 days per week. Resistance training improves insulin sensitivity and reduces resting blood pressure by 3–5 mmHg.</p>
                        </div>
                        <div className="p-5 rounded-2xl bg-amber-50/50" style={{ boxShadow: "var(--clay-input-shadow)" }}>
                            <h4 className="font-bold text-sm mb-2">⚡ Quick Win</h4>
                            <p className="text-xs text-secondary leading-relaxed">Even 10-minute walks after meals significantly reduce post-meal blood sugar spikes and improve vascular function. Start small, build consistency.</p>
                        </div>
                    </div>
                </section>

                {/* Blood Pressure */}
                <section className="card p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center text-xl">💓</div>
                        <h2 className="text-2xl font-black">Blood Pressure Control</h2>
                    </div>
                    <div className="mb-6">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Normal Ranges</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-4 rounded-xl text-center" style={{ boxShadow: "var(--clay-input-shadow)" }}>
                                <div className="text-2xl font-black text-green-600">{"<"}120</div>
                                <div className="text-[10px] font-bold text-gray-400 uppercase">Systolic (mmHg)</div>
                            </div>
                            <div className="p-4 rounded-xl text-center" style={{ boxShadow: "var(--clay-input-shadow)" }}>
                                <div className="text-2xl font-black text-green-600">{"<"}80</div>
                                <div className="text-[10px] font-bold text-gray-400 uppercase">Diastolic (mmHg)</div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 rounded-xl text-sm" style={{ boxShadow: "var(--clay-input-shadow)" }}>
                            <span className="text-lg">🧘</span>
                            <span className="text-xs text-secondary"><strong>Stress management</strong> — chronic stress raises cortisol, constricting blood vessels</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl text-sm" style={{ boxShadow: "var(--clay-input-shadow)" }}>
                            <span className="text-lg">😴</span>
                            <span className="text-xs text-secondary"><strong>Sleep 7–9 hours</strong> — poor sleep increases hypertension risk by 20–32%</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-xl text-sm" style={{ boxShadow: "var(--clay-input-shadow)" }}>
                            <span className="text-lg">🚰</span>
                            <span className="text-xs text-secondary"><strong>Stay hydrated</strong> — dehydration thickens blood, forcing the heart to work harder</span>
                        </div>
                    </div>
                </section>

                {/* Lifestyle */}
                <section className="card p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-xl">🛡️</div>
                        <h2 className="text-2xl font-black">Lifestyle Modifications</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="p-5 rounded-2xl border-l-4 border-red-400" style={{ boxShadow: "var(--clay-input-shadow)" }}>
                            <h4 className="font-bold text-sm mb-2 text-red-600">🚭 Quit Smoking</h4>
                            <p className="text-xs text-secondary leading-relaxed">Smoking damages blood vessel walls, accelerates plaque buildup, and doubles heart attack risk. Within 1 year of quitting, CVD risk drops by 50%. Within 15 years, risk equals that of a non-smoker.</p>
                        </div>
                        <div className="p-5 rounded-2xl border-l-4 border-amber-400" style={{ boxShadow: "var(--clay-input-shadow)" }}>
                            <h4 className="font-bold text-sm mb-2 text-amber-600">🍷 Moderate Alcohol</h4>
                            <p className="text-xs text-secondary leading-relaxed">If you drink: max 1 drink/day for women, 2 for men. Excessive alcohol raises blood pressure, triglycerides, and increases stroke risk by 45%.</p>
                        </div>
                        <div className="p-5 rounded-2xl border-l-4 border-green-400" style={{ boxShadow: "var(--clay-input-shadow)" }}>
                            <h4 className="font-bold text-sm mb-2 text-green-600">⚖️ Healthy Weight</h4>
                            <p className="text-xs text-secondary leading-relaxed">Maintain BMI between 18.5–24.9. Every 5 kg of excess weight increases systolic BP by ~4 mmHg. Even a 5–10% weight loss significantly reduces cardiovascular risk.</p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Warning Signs */}
            <section className="card p-8 md:p-12 bg-gradient-to-br from-[var(--bg-card)] to-red-50/30 relative overflow-hidden mb-10 md:mb-16">
                <div className="absolute -right-10 -bottom-10 text-[150px] opacity-[0.03] pointer-events-none">🚨</div>
                <h2 className="text-3xl font-black mb-8 text-center relative z-10">⚠️ When to See a Doctor Immediately</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                    {[
                        { icon: "💔", text: "Chest pain, pressure, or tightness lasting more than a few minutes" },
                        { icon: "😮‍💨", text: "Unexplained shortness of breath, especially at rest or during mild activity" },
                        { icon: "🫨", text: "Sudden dizziness, fainting, or loss of consciousness" },
                        { icon: "💪", text: "Unusual fatigue or weakness that doesn't improve with rest" },
                        { icon: "🦵", text: "Swelling in legs, ankles, or feet (possible heart failure sign)" },
                        { icon: "💓", text: "Irregular heartbeat, palpitations, or heart racing without exertion" },
                    ].map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-start p-4 rounded-xl bg-white/60 border border-red-100">
                            <span className="text-2xl">{item.icon}</span>
                            <p className="text-sm text-[var(--text-main)] font-medium leading-relaxed">{item.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="card p-8 md:p-12 text-center">
                <h3 className="text-2xl font-black mb-4">Ready to Check Your Risk?</h3>
                <p className="text-secondary max-w-xl mx-auto text-sm mb-6">
                    Use our AI-powered prediction tool to get a cardiovascular risk assessment based on your clinical data.
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                    <Link href="/predict" className="btn btn-primary">
                        Start Prediction
                    </Link>
                    <Link href="/contact" className="btn btn-outline">
                        Ask a Question
                    </Link>
                </div>
            </section>
        </>
    );
}
