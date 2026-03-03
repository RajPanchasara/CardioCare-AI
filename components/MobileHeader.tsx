"use client";

import Link from "next/link";

export default function MobileHeader() {
    return (
        <header className="lg:hidden h-14 px-4 flex items-center justify-center bg-[var(--bg-nav)] backdrop-blur-md border-b border-[rgba(0,0,0,0.05)] z-50 shrink-0">
            <Link href="/" className="flex items-center gap-2">
                <div className="heartbeat text-primary text-2xl">❤️</div>
                <span className="font-bold tracking-tight text-lg text-[var(--text-main)]">CardioCare AI</span>
            </Link>
        </header>
    );
}
