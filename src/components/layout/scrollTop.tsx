"use client";
import { AnimatePresence, m } from "framer-motion";

import { SCALE_BOUNCE_VARIANTS } from "@/lib/constants/variants";

export default function ScrollTop({
    children,
    trigger,
}: {
    children: React.ReactElement;
    trigger: boolean;
}) {
    const handleClick = (
        event: React.MouseEvent<HTMLDivElement>,
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
                    onClick={handleClick}
                    role="presentation"
                    className="fixed bottom-16 right-4 z-[1000] lg:bottom-4"
                >
                    {children}
                </m.div>
            )}
        </AnimatePresence>
    );
}
