"use client";
import { m, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

import {
    SLIDE_Y_VARIANTS,
    STAGGER_VARIANTS,
} from "@/lib/constants/variants";

interface LinkItem {
    name: string;
    url: string;
    icon: ReactNode;
}

const socialLinks: LinkItem[] = [
    {
        name: "GitHub",
        url: "https://github.com/diversis",
        icon: <GitHubIcon />,
    },
];

export default function Social() {
    const ref = useRef(null);
    const isInView = useInView(ref);
    return (
        <m.div
            ref={ref}
            initial="hidden"
            variants={STAGGER_VARIANTS}
            animate={isInView ? "visible" : "exit"}
            exit="exit"
            className="flex flex-row items-center gap-4 xl:items-start xl:gap-6"
        >
            {socialLinks.length > 0 &&
                socialLinks.map((item) => {
                    return (
                        <m.div
                            variants={SLIDE_Y_VARIANTS}
                            key={item.name}
                        >
                            <a
                                href={item.url}
                                aria-label={`find us on ${item.name}`}
                                title={`find us on ${item.name}`}
                                className="group/a"
                            >
                                {item.icon}
                            </a>
                        </m.div>
                    );
                })}
        </m.div>
    );
}
