import Link from "next/link";

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <section className="hero min-h-[70vh] flex flex-col items-center justify-center text-center animate-fade-in px-4">
                <div className="mb-8 relative">
                    <div className="heartbeat text-8xl md:text-9xl filter drop-shadow-lg">❤️</div>
                    {/* SVG ECG pulse behind the heart */}
                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 opacity-20 pointer-events-none"
                        viewBox="0 0 100 20">
                        <path className="ecg-line fill-none"
                            d="M0,10 L10,10 L13,2 L17,18 L20,10 L30,10 L33,2 L37,18 L40,10 L50,10 L53,2 L57,18 L60,10 L70,10 L73,2 L77,18 L80,10 L100,10" />
                    </svg>
                </div>
                <div className="mb-8 relative">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 text-[var(--text-main)] leading-tight">
                        AI-Driven <span className="text-primary italic">Cardiovascular</span> <br />Risk Prediction
                    </h1>
                    <p className="text-xl md:text-2xl text-secondary max-w-2xl mx-auto mb-10 font-medium">
                        Merging advanced Machine Learning with compassionate healthcare to protect your most vital organ.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <Link href="/predict" className="btn btn-primary text-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path
                                d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                        Start Prediction
                    </Link>
                    <Link href="/model" className="btn btn-outline">
                        System Transparency
                    </Link>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
                <div className="card">
                    <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center mb-6 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Live ECG Logic</h3>
                    <p className="text-secondary">Our model processes risk factors with the same precision as a clinical
                        assessment, ensuring high predictive integrity.</p>
                </div>

                <div className="card">
                    <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 text-red-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Health Shield</h3>
                    <p className="text-secondary">Designed with ethical AI principles, providing a first line of defense against
                        cardiovascular misconceptions.</p>
                </div>

                <div className="card">
                    <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mb-6 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path
                                d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                            <line x1="12" y1="22.08" x2="12" y2="12" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Data Enrichment</h3>
                    <p className="text-secondary">Trained on over 70,000 verified patient records to ensure the AI recognizes
                        diverse physiological patterns.</p>
                </div>
            </section>

            {/* Dynamic ECG Section */}
            <section className="mt-16 md:mt-12 p-6 md:p-12 card relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <svg width="100%" height="100%">
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="red" strokeWidth="1" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 relative z-10">
                    <div className="flex-1">
                        <span
                            className="inline-block py-1 px-4 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-widest mb-4">Innovation
                            Core</span>
                        <h2 className="text-4xl font-black mb-6">Designed to Care, Built to Predict.</h2>
                        <p className="text-lg text-secondary mb-8 leading-relaxed">
                            Cardiovascular health shouldn{"'"}t be a mystery. CardioCare AI demystifies medical data, providing
                            you with a transparent risk profile based on 12 key clinical features. We bridge the gap between
                            complex research and everyday wellness.
                        </p>
                        <div className="flex items-center gap-8">
                            <div>
                                <div className="text-4xl font-black text-primary">73%</div>
                                <div className="text-sm font-bold text-gray-400 uppercase tracking-tighter">Accuracy (GBM)</div>
                            </div>
                            <div className="w-px h-12 bg-pink-100"></div>
                            <div>
                                <div className="text-4xl font-black text-primary">Instant</div>
                                <div className="text-sm font-bold text-gray-400 uppercase tracking-tighter">Analysis</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full max-w-md p-4 card" style={{ "--clay-card-shadow": "var(--clay-input-shadow)" } as React.CSSProperties}>
                        <div className="bg-[var(--bg-card)] rounded-[1.5rem] p-6 text-center">
                            <div className="heartbeat text-5xl mb-4">💓</div>
                            <div className="text-gray-400 text-xs uppercase font-bold tracking-widest mb-1">Live Monitor
                                Simulator</div>
                            <div className="h-20 flex items-center justify-center opacity-40">
                                <svg className="w-full h-full" viewBox="0 0 100 20">
                                    <path className="ecg-line fill-none stroke-red-500"
                                        d="M0,10 L10,10 L13,2 L17,18 L20,10 L30,10 L33,2 L37,18 L40,10 L50,10 L53,2 L57,18 L60,10" />
                                </svg>
                            </div>
                            <div className="mt-4 flex justify-between text-[10px] font-bold text-red-300">
                                <span>SYS: 120</span>
                                <span>DIA: 80</span>
                                <span>PULS: 72</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
