"use client";
import Image, { StaticImageData } from "next/image";
import {
    AnimatePresence,
    m,
    useInView,
} from "framer-motion";
import { useRef } from "react";
import { OPACITY_VARIANTS } from "@/lib/constants/variants";

export default function Photo({
    imgSrc,
}: {
    imgSrc: StaticImageData;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref);
    return (
        <>
            <m.div
                key={`photo-${imgSrc}`}
                ref={ref}
                className="circle-mask w-full max-w-[min(50vh,30rem)] !transform-none"
                variants={OPACITY_VARIANTS}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                exit="hidden"
            >
                <div className=" h-full w-full !transform-none  ">
                    <Image
                        src={imgSrc}
                        alt="photo! "
                        className="blob  object-contain"
                    />
                </div>
            </m.div>
        </>
    );
}
