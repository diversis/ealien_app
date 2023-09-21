"use client";
import {
    AnimatePresence,
    m,
    useInView,
} from "framer-motion";
import { useRef, useState } from "react";
import CTA from "./CTA";
import HeroImage from "./HeroImage";
import { OPACITY_VARIANTS } from "@/lib/constants/variants";

export default function HeroSection() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref);
    const [mousePosition, setMousePosition] = useState<{
        x: number;
        y: number;
    }>({ x: 0, y: 0 });
    const handleMouseMove = async (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
    ) => {
        if (isInView && e) {
            // setMouseX(e.clientX);
            // setMouseY(e.clientY);
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        }
    };
    return (
        <m.section
            onMouseMove={handleMouseMove}
            key="hero-section"
            data-test="hero-section"
            ref={ref}
            className=" relative grid min-h-screen w-screen grid-rows-[1fr] place-items-center md:min-h-[calc(100vh_-_6rem)] "
        >
            <article className="container relative flex grid-cols-1 grid-rows-[auto_minmax(0,1fr)_auto] flex-col items-center justify-center gap-8  px-4 py-12 pb-24 md:px-8 lg:grid lg:grid-cols-12 lg:grid-rows-1 lg:gap-0 lg:px-12 xl:py-2">
                <CTA
                    key="CTA"
                    mousePosition={mousePosition}
                    containerVisible={isInView}
                />
                <HeroImage
                    key="hero-image"
                    mousePosition={mousePosition}
                />
            </article>
        </m.section>
    );
}
