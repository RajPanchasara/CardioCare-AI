"use client";

import Link from "next/link";

interface MobileHeaderProps {
    isOpen: boolean;
    onToggle: () => void;
}

export default function MobileHeader({ isOpen, onToggle }: MobileHeaderProps) {
    return (
        <header className="lg:hidden h-14 px-4 flex items-center justify-between bg-[var(--bg-nav)] backdrop-blur-md border-b border-[rgba(0,0,0,0.05)] z-50 shrink-0">
            {/* Brand */}
            <Link href="/" className="flex items-center gap-2">
                <div className="heartbeat text-primary text-2xl">❤️</div>
                <span className="font-bold tracking-tight text-lg text-[var(--text-main)]">CardioCare AI</span>
            </Link>

            {/* Animated hamburger / X toggle button */}
            <button
                onClick={onToggle}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                className="w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-xl
                           hover:bg-[var(--bg-main)] active:scale-90 transition-all duration-200 focus:outline-none"
            >
                {/* Top bar */}
                <span
                    className="block h-[2px] w-5 bg-[var(--text-main)] rounded-full origin-center transition-transform duration-300"
                    style={{ transform: isOpen ? "translateY(7px) rotate(45deg)" : "none" }}
                />
                {/* Middle bar — fades out when open */}
                <span
                    className="block h-[2px] w-5 bg-[var(--text-main)] rounded-full transition-opacity duration-200"
                    style={{ opacity: isOpen ? 0 : 1 }}
                />
                {/* Bottom bar */}
                <span
                    className="block h-[2px] w-5 bg-[var(--text-main)] rounded-full origin-center transition-transform duration-300"
                    style={{ transform: isOpen ? "translateY(-7px) rotate(-45deg)" : "none" }}
                />
            </button>
        </header>
    );
}
