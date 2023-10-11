"use client";
import Link from "next/link";
import { ReactNode } from "react";

import GitHubIcon from "@mui/icons-material/GitHub";
import Social from "../shared/Social";

interface LinkItem {
    name: string;
    url?: string;
    icon?: ReactNode;
}

const linkClassName =
    "h-6 w-6 lg:h-8 lg:w-8 svg-icon-fasolid svg-icon-fasolid-interactive";

const socialLinks: LinkItem[] = [
    {
        name: "GitHub",
        url: "https://github.com/diversis",
        icon: <GitHubIcon />,
    },
];

export default function Footer() {
    return (
        <footer
            data-testid="footer"
            className=" relative grid  w-full place-items-center overflow-hidden bg-surface-200  transition-colors dark:bg-surface-800 "
        >
            <div
                data-testid="footer-container"
                className="flex w-full flex-col items-center gap-4 py-4"
            >
                <div
                    data-testid="footer-logo-wrapper"
                    className="xl:gap-[clamp(2rem,10vw + 2rem,8rem)] container mx-auto flex w-full flex-col items-center justify-center gap-4 px-5 py-6 text-center lg:py-12 xl:flex-row xl:justify-between xl:text-left"
                >
                    <Link
                        data-testid="footer-logo-Link"
                        aria-label="EAlien"
                        title="EAlien'"
                        href="/"
                        className="font-display flex place-items-center gap-x-6 font-bold xl:self-start"
                    >
                        <p
                            data-testid="footer-logo-p"
                            className="h5"
                        >
                            EAlien
                        </p>
                    </Link>
                    {/* <Contacts className="flex-col gap-4" /> */}
                </div>
                <div data-testid="footer-social-wrapper">
                    <Social />
                </div>
                <div
                    data-testid="footer-c-wrapper"
                    className="container flex w-full items-center justify-center px-5 text-center "
                >
                    <p data-testid="footer-c-p">
                        © 2023 EAlien
                    </p>
                </div>
            </div>
            {/* Attribution */}
            <div
                data-testid="footer-madeby-wrapper"
                className="absolute hidden w-full border-t border-gray-200 bg-white text-center"
            >
                <p
                    data-testid="footer-madeby-p"
                    className="text-surface-500"
                >
                    Made by
                    <a
                        data-testid="footer-madeby-a"
                        className="font-medium text-surface-600 underline transition-colors"
                        href="https://github.com/diversis"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        diversis
                    </a>
                </p>
            </div>
        </footer>
    );
}
