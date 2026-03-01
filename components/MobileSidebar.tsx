"use client";

import { useTheme } from "./ThemeProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface MobileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
    const { toggleTheme } = useTheme();
    const pathname = usePathname();

    return (
        <>
            {/* Backdrop */}
            <div
                className={clsx(
                    "fixed inset-0 bg-black/50 backdrop-blur-sm z-[2000] transition-opacity duration-300 md:hidden",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Sidebar Panel */}
            <div
                className={clsx(
                    "fixed top-0 left-0 w-[280px] h-full bg-[var(--bg-card)] z-[2001] shadow-2xl transition-transform duration-300 transform md:hidden flex flex-col p-6",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                        <div className="text-2xl">❤️</div>
                        <span className="font-bold text-xl text-primary">CardioCare AI</span>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-[var(--bg-main)] text-[var(--text-muted)]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Content */}
                {/* Content */}
                <div className="flex-1 flex flex-col gap-6">
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-2">Menu</h3>
                        <Link
                            href="/caution"
                            className={clsx(
                                "flex items-center gap-3 p-3 rounded-xl transition-all font-medium active:scale-95",
                                pathname === "/caution" ? "bg-primary/10 text-primary" : "hover:bg-[var(--bg-main)] text-[var(--text-main)]"
                            )}
                            onClick={onClose}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                <line x1="12" y1="9" x2="12" y2="13"></line>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                            Medical Caution
                        </Link>
                        <Link
                            href="/guidance"
                            className={clsx(
                                "flex items-center gap-3 p-3 rounded-xl transition-all font-medium active:scale-95",
                                pathname === "/guidance" ? "bg-primary/10 text-primary" : "hover:bg-[var(--bg-main)] text-[var(--text-main)]"
                            )}
                            onClick={onClose}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                            Health Guidance
                        </Link>
                        <Link
                            href="/about"
                            className={clsx(
                                "flex items-center gap-3 p-3 rounded-xl transition-all font-medium active:scale-95",
                                pathname === "/about" ? "bg-primary/10 text-primary" : "hover:bg-[var(--bg-main)] text-[var(--text-main)]"
                            )}
                            onClick={onClose}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className={clsx(
                                "flex items-center gap-3 p-3 rounded-xl transition-all font-medium active:scale-95",
                                pathname === "/contact" ? "bg-primary/10 text-primary" : "hover:bg-[var(--bg-main)] text-[var(--text-main)]"
                            )}
                            onClick={onClose}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            Contact
                        </Link>
                    </div>

                    <div className="mt-auto flex justify-start">
                        <button
                            className="theme-toggle-btn w-12 h-12 rounded-full bg-[var(--bg-card)] shadow-[var(--clay-btn-shadow)] flex items-center justify-center text-primary active:shadow-[var(--clay-btn-active)] transition-all active:scale-90"
                            onClick={toggleTheme}
                            aria-label="Toggle Theme"
                        >
                            <svg className="sun-icon w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                            </svg>
                            <svg className="moon-icon w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
