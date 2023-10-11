"use client";
import {
    AnimatePresence,
    HTMLMotionProps,
    m,
} from "framer-motion";

import { SCALE_BOUNCE_VARIANTS } from "@/lib/constants/variants";

interface ScrollTopProps extends HTMLMotionProps<"div"> {
    trigger: boolean;
}

export default function ScrollTop({
    children,
    trigger,
    ...rest
}: ScrollTopProps) {
    const handlePointerDown = (
        event: React.PointerEvent<HTMLDivElement>,
    ) => {
        const anchor = (
            (event.target as HTMLDivElement)
                .ownerDocument || document
        ).querySelector("#page-top");

        if (anchor) {
            anchor.scrollIntoView({
                block: "end",
            });
        }
    };
    return (
        <AnimatePresence>
            {trigger && (
                <m.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={SCALE_BOUNCE_VARIANTS}
                    onPointerDown={handlePointerDown}
                    role="presentation"
                    {...rest}
                >
                    {children}
                </m.div>
            )}
        </AnimatePresence>
    );
}
