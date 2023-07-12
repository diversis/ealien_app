"use client";
import { Variants, m } from "framer-motion";
import { useRef, Dispatch, SetStateAction } from "react";
import Social from "../shared/social";
import Link from "next/link";
import SwitchTheme from "../shared/switchTheme";

export default function MobileMenuContainer({
    toggle,
}: {
    toggle: Dispatch<SetStateAction<boolean>>;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const variants: Variants = {
        open: {
            transform: "translateX(0%)",
            opacity: 1,
            transition: {
                ease: [0.38, 0.65, 0.53, 0.56],
                duration: 0.4,
                when: "beforeChildren",
            },
        },
        closed: {
            transform: "translateX(100%)",
            opacity: 1,
            transition: {
                ease: [0.38, 0.65, 0.53, 0.56],
                duration: 0.3,
            },
        },
    };

    return (
        <m.div
            ref={ref}
            id="nav-container"
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
            className="absolute right-0 top-0 flex h-screen w-[50vw] min-w-[15rem] translate-x-full flex-col gap-8  overflow-hidden bg-surface-50/50 backdrop-blur-[8px] transition-colors duration-300 [transform:translateZ(0)] dark:bg-surface-900/50  "
        >
            {/* <MobileNav
                className={`mt-12 flex flex-col place-self-start ${
                    menuOpen ? "" : ""
                }`}
            ></MobileNav> */}
            <m.div className="mt-20 flex w-full flex-col items-center gap-8 place-self-start px-4">
                <m.div>
                    <Link href="/">
                        <div className="flex place-items-center gap-x-6">
                            AALIEN
                        </div>
                    </Link>
                </m.div>
                {/* <Contacts className="flex-col" /> */}
                <Social />
            </m.div>
            <m.div
                id="theme-toggle "
                variants={{
                    open: {
                        transform: "translateY(0%)",
                        opacity: 1,
                        transition: {
                            ease: "easeOut",
                            duration: 0.6,
                            when: "beforeChildren",
                        },
                    },
                    closed: {
                        transform: "translateY(200%)",
                        opacity: 0,
                        transition: {
                            ease: "easeOut",
                            duration: 0.6,
                            when: "afterChildren",
                        },
                    },
                }}
                className="w-min place-self-center"
            >
                <SwitchTheme />
            </m.div>
        </m.div>
    );
}
