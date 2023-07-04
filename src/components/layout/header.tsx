"use client";
import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import useScrolled from "@/lib/hooks/use-scrolled";
import useScreenSize from "@/lib/hooks/use-screen-size";

import Link from "next/link";
import Social from "../shared/social";
import MobileMenu from "./mobileMenu";
import { OPACITY_VARIANTS } from "@/lib/constants";

const Header = () => {
    // const IsClient = useIsClient();
    const { isMobile, isDesktop } = useScreenSize();
    const [menuOpen, setMenuOpen] = useState(false);
    const scrolled = useScrolled(300);

    return (
        <header className="">
            <AnimatePresence mode="sync">
                {isMobile ? (
                    <m.div
                        variants={OPACITY_VARIANTS}
                        key="menu"
                        className="fixed right-0 top-0 z-[120] grid w-0 grid-cols-1 grid-rows-[0fr] place-items-center "
                    >
                        <MobileMenu />
                    </m.div>
                ) : (
                    <m.div
                        variants={OPACITY_VARIANTS}
                        key="menu"
                        className={`fixed left-0 top-0 z-30 flex h-24  w-screen flex-row items-center justify-between  px-8 backdrop-blur-[8px] transition-colors duration-300 ${scrolled
                            ? "bg-surface-50/50 dark:bg-surface-900/50"
                            : ""
                            }`}
                    >
                        <m.div>
                            <Link href="/">
                                <div className="flex place-items-center gap-x-6">
                                    <div className="h-12 w-12 place-self-center">
                                        <LogoMini />
                                    </div>
                                    <p className="h5">
                                        <HeroText quotes={false}>
                                            Живой Дом
                                        </HeroText>
                                    </p>
                                </div>
                            </Link>
                        </m.div>
                        {/* <MainNav className="flex flex-row" /> */}
                        <Contacts />
                        <Social />
                        <SwitchTheme />
                    </m.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
