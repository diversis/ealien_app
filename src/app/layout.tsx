import "./globals.css";
import type { Session } from "next-auth";
import { Orbitron } from "next/font/google";
import { Metadata } from "next";
import { Providers } from "../utils/providers";
import Filters from "@/components/shared/Filters";
import { DOMAIN } from "@/lib/constants/constants";

const orbitron = Orbitron({
    weight: ["400", "500", "700", "800"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL(DOMAIN),
    title: "EAlien Shop",
    icons: {
        icon: "/favicon.png",
    },
    description:
        "simple showcase ecommerce website for my dev portfolio",
    openGraph: {
        images: ["/images/hero/2048.webp"],
        title: "EAlien Shop",
        description:
            "simple showcase ecommerce website for my dev portfolio",
        url: new URL(DOMAIN),
    },
    twitter: {
        images: ["/images/hero/2048.webp"],
        title: "EAlien Shop",
        description:
            "simple showcase ecommerce website for my dev portfolio",
    },
};

export default function RootLayout({
    children,
    session,
}: {
    children: React.ReactNode;
    session: Session;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={orbitron.className}>
                <div className="fixed left-0 top-0 -z-[11] h-screen w-screen bg-[url(/noise.svg)] bg-cover bg-fixed bg-no-repeat" />
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
