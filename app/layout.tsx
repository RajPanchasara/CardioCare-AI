import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
    title: "HearCare AI",
    description: "AI-powered cardiovascular disease risk prediction platform using Gradient Boosting ML model. Trained on 70,000+ patient records for accurate, explainable heart health assessment.",
    keywords: ["heart disease prediction", "cardiovascular risk", "AI healthcare", "machine learning", "health assessment"],
    authors: [{ name: "Raj Panchasara", url: "https://www.linkedin.com/in/raj-panchasara-291a16301/" }],
    icons: {
        icon: "/Favicon.svg",
    },
    openGraph: {
        title: "CardioCare AI",
        description: "AI-powered cardiovascular disease risk prediction. Trained on 70,000+ patient records.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider>
                    <AppShell>
                        {children}
                    </AppShell>
                </ThemeProvider>
            </body>
        </html>
    );
}
