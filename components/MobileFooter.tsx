"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function MobileFooter() {
    const pathname = usePathname();

    const navItems = [
        {
            name: "Home",
            href: "/",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
            )
        },
        {
            name: "Analytics",
            href: "/analytics",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                </svg>
            )
        },
        {
            name: "Predict",
            href: "/predict",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
            )
        },
        {
            name: "Model",
            href: "/model",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="21 8 21 21 3 21 3 8"></polyline>
                    <rect x="1" y="3" width="22" height="5"></rect>
                    <line x1="10" y1="12" x2="14" y2="12"></line>
                </svg>
            )
        },
        {
            name: "Menu", // Grouping less important items or use a 'More' approach? 
            // Actually user asked for "footer insted of nav bar", implies all links. 
            // 6 links is a lot for mobile footer. Let's try to fit 5 and put others in sidebar? 
            // Or scrollable? Let's try fitting 5: Home, Analytics, Predict, Caution, About.
            // Let's stick to the main ones.
            href: "/about",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
            )
        }
    ];

    // Note: User has 6 links: Home, Analytics, Prediction, Model, Caution, About.
    // 6 items is too crowded for a standard mobile footer.
    // I will put Home, Analytics, Predict, Model. 
    // And put "More" / "About" / "Caution" in the Sidebar or just squeeze them in if using concise icons.
    // Let's try to include all but use scroll or just compact sizing.
    // Actually, "Model", "Caution" and "About" are distinct.

    // Changing approach: Will only show icons + small text, scrollable if needed.

    return (
        <div className="w-full bg-[var(--bg-nav)] backdrop-blur-md border-t border-[rgba(0,0,0,0.05)] pb-safe">
            <div className="flex justify-around items-center px-2 py-0.5">
                <Link href="/" className={clsx("flex flex-col items-center gap-1 p-2 rounded-xl transition-all active:scale-90", pathname === "/" ? "text-primary" : "text-gray-400 hover:text-[var(--text-main)] active:text-primary")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <span className="text-[12px] font-medium">Home</span>
                </Link>

                <Link href="/analytics" className={clsx("flex flex-col items-center gap-1 p-2 rounded-xl transition-all active:scale-90", pathname === "/analytics" ? "text-primary" : "text-gray-400 hover:text-[var(--text-main)] active:text-primary")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="20" x2="18" y2="10"></line>
                        <line x1="12" y1="20" x2="12" y2="4"></line>
                        <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>
                    <span className="text-[12px] font-medium">Data</span>
                </Link>

                <Link href="/predict" className={clsx("flex flex-col items-center gap-1 p-2 rounded-xl transition-all active:scale-90", pathname === "/predict" ? "text-primary" : "text-gray-400 hover:text-[var(--text-main)] active:text-primary")}>
                    <div className={clsx("p-2 rounded-full mb-[-30px] mt-[-25px] shadow-lg border-4 border-[var(--bg-main)]", pathname === "/predict" ? "bg-primary text-white" : "bg-[var(--bg-card)] text-gray-400")}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                        </svg>
                    </div>
                    <span className="text-[13px] font-medium mt-8">Predict</span>
                </Link>

                <Link href="/model" className={clsx("flex flex-col items-center gap-1 p-2 rounded-xl transition-all active:scale-90", pathname === "/model" ? "text-primary" : "text-gray-400 hover:text-[var(--text-main)] active:text-primary")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    </svg>
                    <span className="text-[12px] font-medium">Model</span>
                </Link>

                <Link href="/contact" className={clsx("flex flex-col items-center gap-1 p-2 rounded-xl transition-all active:scale-90", pathname === "/contact" ? "text-primary" : "text-gray-400 hover:text-[var(--text-main)] active:text-primary")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span className="text-[12px] font-medium">Contact</span>
                </Link>
            </div>
        </div>
    );
}
