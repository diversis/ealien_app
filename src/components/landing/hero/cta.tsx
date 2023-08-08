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
    containerVisible: boolean;
    mousePosition: { x: number; y: number };
    // mouseX: number;
    // mouseY: number;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref);
    const { windowSize } = useWindowSize();
    // const [position, setPosition] = useState<{ x: number, y: number }>({ x: mousePosition.x, y: mousePosition.y })

    // const springX = useSpring(position.x, { stiffness: 250, damping: 30 });
    // const springY = useSpring(position.y, { stiffness: 250, damping: 30 });
    // const x = useMotionValue(0);
    // const y = useMotionValue(0);

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

    // const x = useSpring(resX, { stiffness: 550, damping: 20 });
    // const y = useSpring(resY, { stiffness: 550, damping: 20 });

    // useEffect(() => {
    //     if (isInView) {
    //         // const [newX, newY] = onMouseMove(
    //         //     mousePosition,
    //         // );
    //         // const setXY = async (newX: number, newY: number) => {
    //         //     await springX.set(newX);
    //         //     await springY.set(newY);
    //         // }
    //         // console.log("new coords: ", newX, " | ", newY);
    //         setPosition(onMouseMove(mousePosition))
    //         // console.log("new set coords: ", x.get(), " | ", y.get());
    //     }
    // }, [mousePosition, isInView, onMouseMove]);

    return (
        // <AnimatePresence>
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
                    className="text-stroke title-bg linear-mask-heading relative bg-[size:200%_200%] bg-clip-text bg-no-repeat text-[15vw] font-black tracking-widest text-transparent transition-[background-position] delay-100 duration-[2s] ease-out  will-change-[background-position] lg:text-[12vw] "
                >
                    AALIEN
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
        // </AnimatePresence>
    );
}
