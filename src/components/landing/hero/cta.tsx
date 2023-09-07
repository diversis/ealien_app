"use client";
import {
    OPACITY_VARIANTS,
    SUBTITLE_VARIANTS,
    TITLE_VARIANTS,
} from "@/lib/constants";
import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    AnimatePresence,
    m,
    useInView,
    useSpring,
    useMotionValue,
    useTransform,
} from "framer-motion";
import Link from "next/link";

import CTALink from "../cta/ctaLink";
import Balancer from "react-wrap-balancer";
import AnimatedDiv from "@/components/shared/animatedDiv";
import useWindowSize from "@/lib/hooks/use-window-size";

export default function CTA({
    containerVisible,
    mousePosition,
}: {
    containerVisible?: boolean;
    mousePosition: { x: number; y: number };
}) {
    const ref = useRef(null);
    const isInView = useInView(ref);
    const { windowSize } = useWindowSize();

    const onMouseMove = useCallback(
        (mousePosition: {
            x: number;
            y: number;
        }): { x: number; y: number } => {
            const width = windowSize.width || 1;
            const height = windowSize.height || 1;

            const resX =
                -(width / 2 - mousePosition.x) / width;
            const resY =
                -(height / 2 - mousePosition.y) / height;

            if (
                typeof resX !== "number" ||
                typeof resY !== "number"
            ) {
                console.log(resX, resY);
                return { x: 0, y: 0 };
            }
            return { x: resX, y: resY };
        },
        [windowSize],
    );

    const mouseX = useMotionValue(mousePosition.x);
    const mouseY = useMotionValue(mousePosition.y);
    const resX = useTransform(
        mouseX,
        (latest) =>
            -(
                (windowSize.width || 1) / 2 -
                mousePosition.x
            ) / (windowSize.width || 1),
    );
    const resY = useTransform(
        mouseY,
        (latest) =>
            -(
                (windowSize.height || 1) / 2 -
                mousePosition.y
            ) / (windowSize.height || 1),
    );

    return (
        <m.div
            data-test="hero-section-cta"
            key="hero-text"
            ref={ref}
            className="peer/cta  max-w-screen z-10 flex max-h-full flex-col items-center justify-center gap-y-4 px-4 [grid-area:1/1/2/3] lg:h-[calc(100vh_-_7rem)] lg:gap-y-8 lg:py-[5%]  lg:[grid-area:1/1/2/8]"
            variants={OPACITY_VARIANTS}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            exit="hidden"
        >
            <AnimatedDiv variants={TITLE_VARIANTS}>
                <m.h1
                    style={{
                        translateZ: 0,
                        transform: "none",
                        backgroundPosition: `${
                            resX.get() * 10 + 50
                        }% ${resY.get() * 10 + 50}%`,
                    }}
                    tabIndex={0}
                    className="text-stroke linear-mask-heading relative bg-[url(/images/bg/r/26/1024.webp)] bg-[size:200%_200%] bg-clip-text bg-no-repeat text-[clamp(3rem,15vmin,10rem)] font-black tracking-widest text-transparent transition-[background-position] delay-100 duration-[2s] ease-out  will-change-[background-position] lg:text-[clamp(5rem,20vmin,13rem)] "
                >
                    EALIEN
                </m.h1>
            </AnimatedDiv>
            <AnimatedDiv variants={SUBTITLE_VARIANTS}>
                <m.p
                    tabIndex={0}
                    className="text-shadow max-w-[50ch] bg-white bg-clip-text text-center text-lg text-transparent mix-blend-difference  xl:text-left xl:text-xl"
                >
                    <Balancer ratio={0.5}>
                        Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore
                        et dolore magna aliqua
                    </Balancer>
                </m.p>
            </AnimatedDiv>
            <CTALink />
        </m.div>
    );
}
