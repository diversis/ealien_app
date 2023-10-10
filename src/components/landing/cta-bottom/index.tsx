"use client";
import { m, useInView, useScroll } from "framer-motion";
import { useRef } from "react";
<<<<<<< HEAD
import BG from "@/components/shared/bg";
import CTALink from "../cta/CtaLink";
=======
import BG from "@/components/shared/BG";
import CTALink from "../cta/CtaLink";
>>>>>>> temp
import { Typography } from "@mui/material";
import { OPACITY_VARIANTS } from "@/lib/constants";

export default function CTABottom() {
    const ref = useRef(null);
    const isInView = useInView(ref);

    return (
        <m.section
            variants={OPACITY_VARIANTS}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            exit="hidden"
            ref={ref}
            className="container relative flex h-screen w-full  flex-col items-center justify-center gap-y-24 "
        >
            <Typography
                variant="h2"
                className="h2 font-black text-primary-50"
            >
                Go Shopping!
            </Typography>
            <CTALink id="ctalink" className="peer w-56 " />
            <div className="absolute -bottom-[10%] top-0 -z-10 h-screen w-screen [mask:linear-gradient(to_bottom,transparent_0%,#000_25%)]">
                <BG
                    bgSrc="/images/bg/r/28/2048.webp"
                    classNames={{
                        root: "absolute inset-0 [filter:url(#noise)]",
                        bg: "bg-[position:50%_70%!important] bg-fixed",
                    }}
                />
            </div>
        </m.section>
    );
}
