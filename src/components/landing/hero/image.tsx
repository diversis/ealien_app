"use client";
import {
    AnimatePresence,
    cubicBezier,
    m,
    useInView,
    useMotionValue,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import Image from "next/image";

import { OPACITY_VARIANTS } from "@/lib/constants";

import heroImage from "@public/images/hero/1024.webp";
import useWindowSize from "@/lib/hooks/use-window-size";
import debounce from "lodash.debounce";

const imageSizes =
    "(max-width:480px) 60vw, (max-width: 768px) 60vw, 600px";

export default function Hero({
    mousePosition,
}: {
    mousePosition: { x: number; y: number };
    // mouseX: number;
    // mouseY: number;
}) {
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

    // const [imagePosition, setImagePosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
    const mouseX = useMotionValue(mousePosition.x);
    const mouseY = useMotionValue(mousePosition.y);
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

    const onMouseMove = useCallback(
        (mousePosition: {
            x: number;
            y: number;
        }): { x: number; y: number } => {
            const width = windowSize.width || 1;
            const height = windowSize.height || 1;

            const resX =
                Math.cos(
                    -(width / 2 - mousePosition.x) / width,
                ) * 10;
            const resY =
                Math.sin(
                    -(height / 2 - mousePosition.y) /
                        height,
                ) * 10;

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

    // useEffect(() => {
    //     if (isInView) {
    //         // const { newX, newY } = onMouseMove(
    //         //     mousePosition,
    //         // );
    //         // console.log("new coords: ", newX, " | ", newY);
    //         // setXY(newX, newY)
    //         // console.log("new set coords: ", x.get(), " | ", y.get());
    //         setImagePosition(onMouseMove(mousePosition))
    //     }
    // }, [mousePosition, isInView, onMouseMove]);

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
            data-test="hero-section-image"
            key="hero-image"
            ref={ref}
            className="relative flex  max-h-full w-full max-w-[60%] items-center justify-center place-self-center [grid-area:2/1/3/2] lg:max-w-full lg:[grid-area:1/8/3/13]"
            variants={OPACITY_VARIANTS}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            exit="hidden"
            // style={{
            //     x,
            //     transition: "transform 100ms ease-out",
            // }}
        >
            <svg
                style={{
                    display: "none",
                    opacity: 1,
                    background: "transparent",
                    position: "absolute",
                    height: 0,
                    width: 0,
                }}
            >
                <defs>
                    <filter id="hero-noise">
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
            <div className="relative isolate flex aspect-square  max-h-full w-full">
                {/* <div className="radial-mask absolute -bottom-[10%] -left-[10%] -right-[10%] -top-[10%] isolate -z-[1] bg-black bg-gradient-to-t from-tertiary-200 to-primary-100"></div> */}
                <div className="relative isolate z-10 aspect-[640/951] h-auto w-full">
                    <m.span
                        style={{
                            fontSize: "20vmin",
                            x,
                            y,
                        }}
                        className="radial-mask text-stroke absolute inset-0 break-all font-bold text-transparent"
                    >
                        {Math.abs(
                            Math.floor(
                                x.get() *
                                    y.get() *
                                    10000000,
                            ),
                        )}
                    </m.span>
                    <Image
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
