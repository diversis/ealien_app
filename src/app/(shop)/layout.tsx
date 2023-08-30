"use client";
import { Suspense } from "react";
import PageTransition from "../pageTransition";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import MUIProgress from "@/components/shared/muiProgress";

export default function CatalogueLayout({
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
                className="mb-12 mt-8 flex min-h-screen w-screen flex-col md:mt-24 md:min-h-[calc(100vh_-_6rem)] lg:mb-20 lg:mt-24 xl:mb-24 xl:mt-32"
            >
                <Suspense fallback={<MUIProgress />}>
                    <PageTransition>
                        {children}
                    </PageTransition>
                </Suspense>
            </main>
            <Footer />
        </>
    );
}
