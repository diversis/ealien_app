"use client";

import Head from "next/head";
import { m, AnimatePresence } from "framer-motion";
import { Serializable } from "child_process";
import {
    CompactProduct,
    SerializedPrisma,
} from "@/lib/prisma/types";
import Waves from "@/components/landing/waves";
import HeroSection from "@/components/landing/hero";
import FeaturesSection from "@/components/landing/features";
import TestimonialsSection from "@/components/landing/testimonials";
import CTABottom from "@/components/landing/cta-bottom";
import BestProductsCarousel from "@/components/landing/best-products";

export default function Home({
    products,
}: {
    products: SerializedPrisma<CompactProduct>[];
}) {
    return (
        <>
            <Head>
                <title>AAlien</title>
                <meta name="description" content="aalien" />
            </Head>
            <div className=" flex w-full flex-col items-center justify-center gap-y-4 overflow-hidden lg:gap-y-8 lg:[overflow:initial] xl:gap-y-16">
                <Waves />
                <AnimatePresence>
                    {/* <Social /> */}
                    <HeroSection key="hero-section" />
                    <FeaturesSection key="features-section" />
                    <TestimonialsSection key="testimonials-section" />
                    <BestProductsCarousel
                        key="best-products-section"
                        products={products}
                    />
                    <CTABottom key="cta-bottom-section" />
                </AnimatePresence>
            </div>
        </>
    );
}
