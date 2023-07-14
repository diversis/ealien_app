"use client";
import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import useScrolled from "@/lib/hooks/use-scrolled";

import Link from "next/link";

import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import Social from "../shared/social";
import MobileMenu from "./mobileMenu";
import { OPACITY_VARIANTS } from "@/lib/constants";
import useWindowSize from "@/lib/hooks/use-window-size";
import SwitchTheme from "../shared/switchTheme";
import ScrollTop from "./scrollTop";
import { AppBar, Box } from "@mui/material";
import Cart from "../cart/cart";

const Header = () => {
    // const IsClient = useIsClient();
    const { isMobile, isDesktop } = useWindowSize();
    const [menuOpen, setMenuOpen] = useState(false);
    // const scrolled = useScrolled(300);
    // const trigger = useScrollTrigger({
    //     target: window ? window : undefined,
    //     threshold: 300,
    // });
    const MAppBar = m(AppBar);
    return (
        <>
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
                    <MAppBar
                        variants={OPACITY_VARIANTS}
                        key="menu"
                        color="transparent"
                        className={`fixed left-0 top-0 z-30 flex !h-24  w-screen items-center backdrop-blur-[8px] transition-colors duration-300 `}
                    >
                        <div
                            className={`flex h-full w-full flex-row items-center justify-between  px-8 transition-colors duration-300 `}
                        >
                            <m.div>
                                <Link href="/">
                                    <div className="flex place-items-center gap-x-6">
                                        AALIEN
                                    </div>
                                </Link>
                            </m.div>
                            {/* <MainNav className="flex flex-row" /> */}
                            {/* <Contacts /> */}
                            <div className="flex flex-row gap-2">
                                <Cart />
                                <Social />
                                <SwitchTheme />
                            </div>
                        </div>
                    </MAppBar>
                )}
            </AnimatePresence>
            <ScrollTop>
                <Fab
                    size="small"
                    aria-label="scroll back to top"
                >
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </>
    );
};

export default Header;
