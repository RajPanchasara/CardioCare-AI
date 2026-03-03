"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Navbar from "./Navbar";
import MobileHeader from "./MobileHeader";
import MobileSidebar from "./MobileSidebar";
import MobileFooter from "./MobileFooter";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    // Swipe detection
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        const x = e.targetTouches[0].clientX;
        // Open: only from left edge (≤50px). Close: anywhere when sidebar is open.
        if (x <= 50 || isSidebarOpen) {
            setTouchStart(x);
        } else {
            setTouchStart(null);
        }
    };

    const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd; // positive = left swipe
        if (distance < -minSwipeDistance && !isSidebarOpen) setIsSidebarOpen(true);   // right swipe → open
        if (distance > minSwipeDistance && isSidebarOpen) setIsSidebarOpen(false);    // left swipe → close
    };

    return (
        <div
            className="h-[100dvh] flex flex-col relative overflow-hidden bg-[var(--bg-main)]"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <MobileHeader isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(prev => !prev)} />
            <Navbar onOpenSidebar={() => setIsSidebarOpen(true)} />

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden relative scroll-smooth w-full">
                <main className="main-content flex-1 min-h-full">
                    {children}
                </main>

                <footer className={clsx(
                    "mt-10 py-7 lg:pb-7 bg-[var(--bg-card)] border-t-2 border-[var(--bg-card)]-100 text-center",
                    pathname !== "/about" && pathname !== "/contact" && "hidden lg:block"
                )}>
                    <p className="text-secondary font-medium">&copy; 2026 CardioCare AI. AI-Powered Cardiovascular Risk Prediction Platform.</p>
                    <p className="text-[13px] text-secondary mt-1">
                        It's Student academic project — not a substitute for professional medical advice.
                    </p>
                </footer>
            </div>

            {/* Mobile Extras */}
            <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Mobile Footer sits statically at bottom of flex container */}
            <div className="lg:hidden z-[1001] w-full shrink-0">
                <MobileFooter />
            </div>
        </div>
    );
}
