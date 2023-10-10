"use client";
import { Dispatch, SetStateAction, useEffect } from "react";
import { m } from "framer-motion";

const Path = (props: any) => (
    <m.path
        fill="transparent"
        strokeWidth="3"
        stroke="var(--background)"
        strokeLinecap="round"
        transition={{ duration: 0.3, ease: "easeOut" }}
        {...props}
    />
);

export const MenuToggle = ({
    toggle,
    menuOpen,
}: {
    toggle: Dispatch<SetStateAction<boolean>>;
    menuOpen: boolean;
}) => {
    return (
        <m.button
            initial="closed"
            animate={menuOpen ? "open" : "closed"}
            exit="closed"
            onClick={async () => {
                await toggle((state) => !state);
            }}
            className="button-overlay fixed right-4 top-4  grid place-items-center  rounded-full p-1 "
        >
            <svg
                width="22"
                height="18"
                viewBox="0 0 22 18"
                className="h-6 w-6  stroke-surface-900 dark:stroke-surface-50"
            >
                <Path
                    id="top"
                    d="M 2 2.5 L 20 2.5"
                    className=""
                    variants={{
                        closed: { d: "M 2 2.5 L 20 2.5" },
                        open: { d: "M 3 16.5 L 17 2.5" },
                    }}
                />
                <Path
                    id="middle"
                    d="M 2 9.423 L 20 9.423"
                    variants={{
                        closed: { opacity: 1 },
                        open: { opacity: 0 },
                    }}
                    className=""
                />
                <Path
                    id="bottom"
                    d="M 2 16.346 L 20 16.346"
                    className="h-6 w-6"
                    variants={{
                        closed: { d: "M 2 16.346 L 20 16.346" },
                        open: { d: "M 3 2.5 L 17 16.346" },
                    }}
                />
            </svg>
        </m.button>
    );
};
