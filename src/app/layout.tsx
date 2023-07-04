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
                <Providers session={session}>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
