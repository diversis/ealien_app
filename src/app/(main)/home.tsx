"use client";

import Head from "next/head";
import { m, AnimatePresence } from "framer-motion";
import { Serializable } from "child_process";
import {
    CompactProduct,
    SerializableNext,
} from "@/lib/prisma/types";
import Image from "next/image";
import HeroSection from "@/components/landing/hero";
import ProductCard from "@/components/catalogue/productCard";
import Carousel from "@/components/shared/carousel/carousel";
import FeaturesSection from "@/components/landing/features";
import TestimonialsSection from "@/components/landing/testimonials";
// import dynamic from "next/dynamic";
// import Social from "@/components/shared/social";

// const FeaturesSection = dynamic(
//     () => import("@/components/landing/features/index"),
// );
// const HeroSection = dynamic(() => import("@/components/landing/hero"));
// const BottomCTASection = dynamic(
//     () => import("@/components/landing/bottomCTA"),
// );
// const CarouselSection = dynamic(() => import("@/components/landing/carousel"));
// const MissionSection = dynamic(() => import("@/components/landing/mission"));
// const AboutSection = dynamic(() => import("@/components/landing/about"));
// const TopCTASection = dynamic(() => import("@/components/landing/topCTA"));

export default function Home({
    products,
}: {
    products: SerializableNext<CompactProduct>[];
}) {
    return (
        <>
            <Head>
                <title>AAlien</title>
                <meta name="description" content="aalien" />
            </Head>
            <div className=" mb-8 flex w-full flex-col items-center justify-center gap-y-4 lg:gap-y-8 xl:mb-16 xl:gap-y-16">
                <AnimatePresence>
                    {/* <Social /> */}
                    <HeroSection key='hero-section' />
                    <FeaturesSection key='features-section' />
                    <TestimonialsSection key='testimonials-section' />
                    <Carousel key='carousel-section'>
                        {products.map((product) => (
                            <ProductCard key={`card-${product.id}`} product={product} />
                        ))}
                    </Carousel>
                </AnimatePresence>
            </div>
        </>
    );
}
