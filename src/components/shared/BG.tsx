"use client";
import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { OPACITY_VARIANTS } from "@/lib/constants/variants";

export default function BG({
    bgSrc,
    classNames,
    testLabel = "",
}: {
    bgSrc: string;
    classNames?: { root?: string; bg?: string };
    testLabel?: string;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref);
    return (
        <m.div
            data-testid={`${testLabel}-BG-root`}
            ref={ref}
            className={`!transform-none  ${classNames?.root}`}
            variants={OPACITY_VARIANTS}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            exit="hidden"
        >
            <div
            data-testid={`${testLabel}-BG-bg`}
                style={{
                    backgroundImage: "url(" + bgSrc + ")",
                }}
                className={`hero-bg inset-0 h-full  w-full  !transform-none  ${classNames?.bg}`}
            ></div>
        </m.div>
    );
}
