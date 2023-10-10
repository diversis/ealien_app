import { OPACITY_VARIANTS } from "@/lib/constants/variants";
import {
    AnimatePresence,
    m,
    useInView,
} from "framer-motion";
import { useRef } from "react";

export default function Waves() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref);
    return (
        <m.div
            ref={ref}
            variants={OPACITY_VARIANTS}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            exit="hidden"
            className="waves pointer-events-none absolute inset-0 z-10 overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-t before:from-primary-200/10 before:to-accent-100/20 before:leading-[0] before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:bg-gradient-to-t after:from-tertiary-900/10 after:to-secondary-900/20 after:leading-[0] after:opacity-0 after:transition-opacity after:duration-500 dark:before:opacity-0 dark:after:opacity-100"
        />
    );
}
