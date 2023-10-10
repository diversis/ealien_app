"use client";
import { m, useInView } from "framer-motion";
import { useRef, useState } from "react";
import CTA from "./CTA";
import HeroImage from "./Image";

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
            data-testid="hero-section"
            ref={ref}
            className=" relative grid min-h-screen w-screen grid-rows-[1fr] place-items-center md:min-h-[calc(100vh_-_6rem)] "
        >
            <article
                data-testid="hero-section-article"
                className="container relative flex grid-cols-1 grid-rows-[auto_minmax(0,1fr)_auto] flex-col items-center justify-center gap-8  px-4 py-12 pb-24 md:px-8 lg:grid lg:grid-cols-12 lg:grid-rows-1 lg:gap-0 lg:px-12 xl:py-2"
            >
                <CTA
                    key="CTA"
                    mousePosition={mousePosition}
                    containerVisible={isInView}
                />
                <HeroImage
                    key="hero-image"
                    mousePosition={mousePosition}
                    className="relative flex  max-h-full w-full max-w-[60%] items-center justify-center place-self-center [grid-area:2/1/3/2] lg:max-w-full lg:[grid-area:1/8/3/13]"
                />
            </article>
        </m.section>
    );
}
