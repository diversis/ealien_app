import "./globals.css";
import type { Session } from "next-auth";
import { Orbitron } from "next/font/google";
import { Metadata } from "next";
import { Providers } from "../utils/providers";
import Filters from "@/components/shared/filters";
import { DOMAIN } from "@/lib/constants";

const orbitron = Orbitron({
    weight: ["400", "500", "700", "800"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL(DOMAIN),
    title: "AAlien Shop",
    icons: {
        icon: "/favicon.png",
    },
    description:
        "simple showcase ecommerce website for my dev portfolio",
    openGraph: {
        images: ["/images/hero/2048.webp"],
        title: "AAlien Shop",
        description:
            "simple showcase ecommerce website for my dev portfolio",
        url: new URL(DOMAIN),
    },
    twitter: {
        images: ["/images/hero/2048.webp"],
        title: "AAlien Shop",
        description:
            "simple showcase ecommerce website for my dev portfolio",
    },
};

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
    session,
}: {
    children: React.ReactNode;
    session: Session;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={orbitron.className}>
                <div className="absolute inset-0 -z-[11] bg-[url(/noise.svg)] bg-fixed bg-repeat lg:bg-[url(/noise-animated.svg)]" />
                <Filters />
                <a
                    key="skip-to-content"
                    href="#main"
                    className="fixed top-0 z-[9000] mx-auto -translate-y-full bg-surface-50 px-4 py-2 transition-transform focus:translate-y-0 dark:bg-surface-900"
                >
                    Skip to content
                </a>

                <div id="page-top" />

                <Providers session={session}>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
