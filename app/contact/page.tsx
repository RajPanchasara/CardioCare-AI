"use client";

import React, { useState } from "react";
import StatsCounter from "@/components/StatsCounter";

export default function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"IDLE" | "SENDING" | "SENT" | "ERROR">("IDLE");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("SENDING");

        try {
            // EmailJS integration — replace these with your actual keys from https://www.emailjs.com
            const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
            const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
            const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

            const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    service_id: EMAILJS_SERVICE_ID,
                    template_id: EMAILJS_TEMPLATE_ID,
                    user_id: EMAILJS_PUBLIC_KEY,
                    template_params: {
                        from_name: formData.name,
                        from_email: formData.email,
                        message: formData.message,
                        to_email: "rajpanchasara21@gmail.com",
                    },
                }),
            });

            if (response.ok) {
                setStatus("SENT");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatus("ERROR");
            }
        } catch {
            setStatus("ERROR");
        }
    };

    return (
        <>
            <header className="mb-8 md:mb-16 text-center animate-fade-in">
                <span className="inline-block py-1 px-4 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-widest mb-4">
                    Get In Touch
                </span>
                <h1 className="text-5xl font-black mb-4">Contact</h1>
                <p className="text-xl text-secondary max-w-2xl mx-auto">
                    Have questions about CardioCare AI? Want to collaborate or discuss the technology?
                    I&apos;d love to hear from you.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 md:gap-10 max-w-5xl mx-auto">
                {/* Contact Form */}
                <section className="card p-8 md:p-10">
                    <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                        <span className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                        </span>
                        Send a Message
                    </h2>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1">
                                Your Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 rounded-xl border-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 rounded-xl border-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase text-[var(--text-muted)] mb-1">
                                Message
                            </label>
                            <textarea
                                name="message"
                                required
                                rows={5}
                                placeholder="Tell me about your question or idea..."
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-3 rounded-xl border-none text-sm resize-none"
                                style={{ boxShadow: "var(--clay-input-shadow)", background: "var(--bg-main)", color: "var(--text-main)", fontFamily: "'Inter', sans-serif" }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === "SENDING"}
                            className="w-full btn btn-primary py-4 group"
                        >
                            <span>
                                {status === "SENDING" ? "Sending..." :
                                    status === "SENT" ? "✅ Message Sent!" :
                                        status === "ERROR" ? "❌ Try Again" :
                                            "Send Message"}
                            </span>
                            <svg className="group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg"
                                width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                        </button>

                        {status === "SENT" && (
                            <p className="text-center text-sm text-green-600 font-medium animate-fade-in">
                                Thank you! I&apos;ll get back to you soon.
                            </p>
                        )}
                        {status === "ERROR" && (
                            <p className="text-center text-sm text-red-500 font-medium animate-fade-in">
                                Something went wrong. Please try again.
                            </p>
                        )}
                    </form>
                </section>

                {/* Connect — Minimal Social Section */}
                <aside className="flex flex-col items-center lg:items-start gap-6 lg:pt-4">
                    <div className="card p-6 w-full text-center">
                        <h3 className="text-sm font-black uppercase tracking-widest text-[var(--text-main)] mb-1">Connect</h3>
                        <p className="text-[13px] text-secondary mb-5">Prefer social? Find me here.</p>

                        <div className="flex justify-center gap-4">
                            {/* LinkedIn */}
                            <a
                                href="https://www.linkedin.com/in/raj-panchasara-291a16301/"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="LinkedIn"
                                className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-200 hover:scale-110"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                    <rect x="2" y="9" width="4" height="12" />
                                    <circle cx="4" cy="4" r="2" />
                                </svg>
                            </a>

                            {/* GitHub */}
                            <a
                                href="https://github.com/rajpanchasara"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="GitHub"
                                className="w-12 h-12 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center transition-all duration-300 hover:bg-gray-800 hover:text-white hover:shadow-lg hover:shadow-gray-300 hover:scale-110"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </aside>
            </div>
        </>
    );
}

