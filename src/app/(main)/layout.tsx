"use client";
import { Suspense } from "react";
import { CircularProgress } from "@mui/material";
import PageTransition from "../pageTransition";
import Footer from "@/components/layout/footer";

export default function MainLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <main
                key="main"
                id="main"
                className="mb-16 flex min-h-screen w-screen flex-col md:mt-24 md:min-h-[calc(100vh_-_6rem)] lg:mb-20 xl:mb-24"
            >
                <Suspense fallback={<CircularProgress />}>
                    <PageTransition>
                        {children}
                    </PageTransition>
                </Suspense>
            </main>
            <Footer />
        </>
    );
}
