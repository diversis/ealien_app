import "./globals.css";
import type { Session } from "next-auth";

import { Providers } from "./providers";
import Filters from "@/components/shared/filters";

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
            <body>
                <Filters />
                <a
                    key="skip-to-content"
                    href="#main"
                    className="fixed top-0 z-[9000] mx-auto -translate-y-full bg-surface-50 px-4 py-2 transition-transform focus:translate-y-0 dark:bg-surface-900"
                >
                    Skip to content
                </a>
                <Providers session={session}>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
