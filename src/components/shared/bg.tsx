"use client"
import Image from "next/image";
import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { OPACITY_VARIANTS, TITLE_VARIANTS } from "@/lib/constants";
import bg from "@public/images/bg/r/23/2048.webp";

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
            data-test={`${testLabel}-bg`}
            ref={ref}
            className={`!transform-none  ${classNames?.root}`}
            variants={OPACITY_VARIANTS}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            exit="hidden"
        >
            <div
                style={{ backgroundImage: "url(" + bgSrc + ")" }}
                className={`hero-bg inset-0 h-full  w-full  !transform-none  ${classNames?.bg}`}
            >
                {/* <Image
                        src={bg}
                        alt="tall luminescent pillars background "
                        className=" object-cover"
                    /> */}
            </div>
        </m.div>
    );
}
