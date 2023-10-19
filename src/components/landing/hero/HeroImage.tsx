"use client";
import {
    HTMLMotionProps,
    m,
    useInView,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";

import { OPACITY_VARIANTS } from "@/lib/constants/variants";

import heroImage from "@public/images/hero/1024.webp";
import useWindowSize from "@/lib/hooks/useWindowSize";
import debounce from "lodash.debounce";

interface HeroImageProps extends HTMLMotionProps<"div"> {
    mousePosition: { x: number; y: number };
}

const imageSizes =
    "(max-width:480px) 60vw, (max-width: 768px) 60vw, 600px";

export default function Hero({
    mousePosition,
    ...rest
}: HeroImageProps) {
    const ref = useRef<HTMLDivElement>(null);
    const displacementRef =
        useRef<SVGAnimationElement>(null);
    const turbulenceRef = useRef<SVGAnimationElement>(null);
    const { windowSize } = useWindowSize();
    const { scrollY, scrollYProgress } = useScroll();
    const springScroll = useSpring(scrollY, {
        damping: 20,
        stiffness: 150,
    });
    const isInView = useInView(ref);

    const mouseX = useMotionValue(mousePosition.x);
    const mouseY = useMotionValue(mousePosition.y);
    const calcX = useTransform(mouseX, (latest) =>
        Math.abs(
            Math.floor(mousePosition.x * 1000000 + 1111),
        ),
    );
    const calcY = useTransform(mouseY, (latest) =>
        Math.abs(
            Math.floor(mousePosition.y * 10000000 + 1111),
        ),
    );
    const bgNumberX = useSpring(calcX, {
        damping: 50,
        stiffness: 250,
    });
    const bgNumberY = useSpring(calcY, {
        damping: 50,
        stiffness: 250,
    });
    const resX = useTransform(
        mouseX,
        (latest) =>
            Math.tanh(
                -(
                    (windowSize.width || 1) / 2 -
                    mousePosition.x
                ) / (windowSize.width || 1),
            ) * 50,
    );
    const resY = useTransform(
        mouseY,
        (latest) =>
            Math.sin(
                -(
                    (windowSize.height || 1) / 2 -
                    mousePosition.y
                ) / (windowSize.height || 1),
            ) * 50,
    );

    const x = useSpring(resX, {
        stiffness: 250,
        damping: 150,
    });
    const y = useSpring(resY, {
        stiffness: 250,
        damping: 150,
    });

    useEffect(() => {
        {
            // console.log(scrollYProgress.get())
            const playAnimation = debounce(async () => {
                if (
                    isInView &&
                    displacementRef.current &&
                    turbulenceRef.current
                ) {
                    await displacementRef.current.beginElement();
                    await turbulenceRef.current.beginElement();
                    await displacementRef.current.endElement();
                    await turbulenceRef.current.endElement();
                }
            }, 500);
            playAnimation.cancel();
            playAnimation();
        }
    }, [
        displacementRef,
        isInView,
        springScroll,
        mousePosition,
    ]);
    return (
        <m.div
            data-testid="hero-section-image-container"
            key="hero-image"
            ref={ref}
            variants={OPACITY_VARIANTS}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            exit="hidden"
            {...rest}
        >
            <svg
                data-testid="hero-section-image-svg"
                style={{
                    display: "none",
                    opacity: 1,
                    background: "transparent",
                    position: "absolute",
                    height: 0,
                    width: 0,
                }}
            >
                <defs data-testid="hero-section-image-svg-defs">
                    <filter
                        data-testid="hero-section-image-svg-defs-filter"
                        id="hero-noise"
                    >
                        <feTurbulence
                            baseFrequency="0.6,0.8"
                            seed="0"
                            type="fractalNoise"
                            result="static"
                        >
                            <animate
                                ref={turbulenceRef}
                                attributeName="seed"
                                values={`0;${
                                    30 + Math.random() * 50
                                };0`}
                                dur={`${
                                    Math.floor(
                                        Math.random() *
                                            1000,
                                    ) + 250
                                }ms`}
                                repeatCount="1"
                                begin="indefinite"
                            />
                        </feTurbulence>
                        <feDisplacementMap
                            in="SourceGraphic"
                            in2="static"
                        >
                            <animate
                                ref={displacementRef}
                                attributeName="scale"
                                values={`0;${
                                    10 + Math.random() * 10
                                };0`}
                                dur={`${
                                    Math.floor(
                                        Math.random() *
                                            1000,
                                    ) + 250
                                }ms`}
                                repeatCount="1"
                                begin="indefinite"
                            />
                        </feDisplacementMap>
                    </filter>
                </defs>
            </svg>
            <div
                data-testid="hero-section-image-wrapper-1"
                className="relative isolate flex aspect-square  max-h-full w-full"
            >
                {/* <div className="radial-mask absolute -bottom-[10%] -left-[10%] -right-[10%] -top-[10%] isolate -z-[1] bg-black bg-gradient-to-t from-tertiary-200 to-primary-100"></div> */}
                <div
                    data-testid="hero-section-image-wrapper-2"
                    className="relative isolate z-10 aspect-[640/951] h-auto w-full"
                >
                    <m.div
                        data-testid="hero-section-image-digits-wrapper"
                        style={{
                            fontSize: "20vmin",
                            x,
                            y,
                        }}
                        className="radial-mask text-stroke absolute inset-0 flex flex-wrap break-all font-bold text-transparent"
                    >
                        <m.span data-testid="hero-section-image-digits-x">
                            {bgNumberX}
                        </m.span>
                        <m.span data-testid="hero-section-image-digits-y">
                            {bgNumberY}
                        </m.span>
                    </m.div>
                    <Image
                        data-testid="hero-section-image-Image"
                        fill
                        sizes={imageSizes}
                        src={heroImage}
                        alt="Site Hero"
                        className="radial-mask absolute inset-0 aspect-[640/951] h-auto w-full object-contain [filter:url(#hero-noise)]"
                        priority
                    />
                </div>
            </div>
        </m.div>
    );
}
