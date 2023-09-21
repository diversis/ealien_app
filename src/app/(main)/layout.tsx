"use client";
import { Suspense } from "react";
import PageTransition from "../pageTransition";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MUIProgress from "@/components/shared/MuiProgress";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main
                key="main"
                id="main"
                className="max-w-screen mb-0 flex min-h-screen w-screen flex-col md:mt-24 md:min-h-[calc(100vh_-_6rem)] "
            >
                <Suspense fallback={<MUIProgress />}>
                    {/* <PageTransition> */}
                    {children}
                    {/* </PageTransition> */}
                </Suspense>
            </main>
            <Footer />
        </>
    );
}
