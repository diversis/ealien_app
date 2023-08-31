"use client";
import {
    AnimatePresence,
    m,
    useInView,
    useScroll,
} from "framer-motion";
import { useRef, useState } from "react";
import CTA from "./cta";
import Hero from "./image";
import { OPACITY_VARIANTS } from "@/lib/constants";

export default function HeroSection() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollY, scrollYProgress } = useScroll({
        target: ref,
        offset: ["end end", "end start"],
    });
    const isInView = useInView(ref);
    const [mouseX, setMouseX] = useState<number>(0);
    const [mouseY, setMouseY] = useState<number>(0);
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
            <AnimatePresence>
                {isInView ? (
                    <m.div
                        initial="hidden"
                        exit="exit"
                        animate="visible"
                        variants={OPACITY_VARIANTS}
                        className="waves absolute inset-x-0 -bottom-96 -top-24 before:absolute before:inset-0 before:bg-gradient-to-t before:from-primary-100/50 before:to-tertiary-100/50 before:leading-[0] before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-gradient-to-t after:from-primary-600/50 after:to-secondary-800/50 after:leading-[0] after:opacity-0 after:transition-opacity after:duration-500 dark:before:opacity-0 dark:after:opacity-100"
                    ></m.div>
                ) : null}
            </AnimatePresence>
            <article className="container relative flex grid-cols-1 grid-rows-[auto_minmax(0,1fr)_auto] flex-col items-center justify-center gap-8 overflow-visible px-4 py-12 pb-24 md:px-8 lg:grid lg:grid-cols-12 lg:grid-rows-1 lg:gap-0 lg:px-12 xl:py-2">
                <CTA
                    key="CTA"
                    mousePosition={mousePosition}
                    containerVisible={isInView}
                />
                <Hero
                    key="hero-image"
                    mousePosition={mousePosition}
                />
            </article>
        </m.section>
    );
}
