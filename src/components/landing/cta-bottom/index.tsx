"use client";
import { m, useInView, useScroll } from "framer-motion";
import { useRef } from "react";
import BG from "@/components/shared/bg";
import CTALink from "../cta/ctaLink";
import { Typography } from "@mui/material";
import { OPACITY_VARIANTS } from "@/lib/constants";

export default function CTABottom() {
    const ref = useRef(null);
    const { scrollY, scrollYProgress } = useScroll({
        target: ref,
        offset: ["end end", "end start"],
    });
    const isInView = useInView(ref);
    // const scale = useTransform(scrollYProgress, [0.5, 0.8], [1, 0.5]);

    return (
        <m.section
            variants={OPACITY_VARIANTS}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            exit="hidden"
            ref={ref}
            className="container relative flex h-[100vh]  w-full flex-col items-center justify-center gap-y-24"
        >
            <Typography
                variant="h2"
                className="h2 font-black text-primary-50"
            >
                Go Shopping!
            </Typography>
            <CTALink id="ctalink" className="peer w-56 " />
            <BG
                bgSrc="/images/bg/r/28/2048.webp"
                classNames={{
                    root: "absolute  w-screen top-0 -bottom-[10%] h-[100dvh] -z-10 diagonal-mask-2   ",
                    bg: "bg-[position:50%_70%!important]  bg-fixed linear-mask-borders ",
                }}
            />
            <BG
                bgSrc="/images/bg/r/28/2048.webp"
                classNames={{
                    root: " absolute w-screen top-0 -bottom-[10%] h-[100dvh] -z-10 diagonal-mask-2  peer-hover:[&>div]:[filter:url(#noise)]",
                    bg: "bg-[position:50%_70%!important] bg-fixed linear-mask-frame ",
                }}
            />
        </m.section>
    );
}
