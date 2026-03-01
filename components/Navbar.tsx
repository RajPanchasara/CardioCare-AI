"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import clsx from "clsx";

interface NavbarProps {
    onOpenSidebar?: () => void;
}

export default function Navbar({ onOpenSidebar }: NavbarProps) {
    const pathname = usePathname();
    const { toggleTheme } = useTheme();

    return (
        <nav className="navbar hidden lg:flex">
            <Link href="/" className="nav-brand">
                <div className="heartbeat text-primary text-2xl">❤️</div>
                <span className="font-bold tracking-tight">CardioCare AI</span>
            </Link>

            <div className="hidden md:flex nav-links items-center gap-4">
                <Link href="/" className={clsx(pathname === "/" && "active")}>Home</Link>
                <Link href="/predict" className={clsx(pathname === "/predict" && "active")}>Predict</Link>
                <Link href="/analytics" className={clsx(pathname === "/analytics" && "active")}>Analytics</Link>
                <Link href="/model" className={clsx(pathname === "/model" && "active")}>Model</Link>
                <Link href="/guidance" className={clsx(pathname === "/guidance" && "active")}>Guidance</Link>
                <Link href="/about" className={clsx(pathname === "/about" && "active")}>About</Link>
                <Link href="/contact" className={clsx(pathname === "/contact" && "active")}>Contact</Link>
                <button className="theme-toggle-btn ml-4" aria-label="Toggle Theme" onClick={toggleTheme}>
                    <svg className="sun-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                    <svg className="moon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </button>
            </div>

            {/* Hamburger — visible only when nav links are hidden (below md) */}
            <button
                onClick={() => onOpenSidebar?.()}
                aria-label="Open menu"
                className="md:hidden ml-auto p-2 rounded-lg text-[var(--text-main)] hover:bg-[var(--bg-main)] transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
            </button>
        </nav>
    );
}
