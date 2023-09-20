"use client";
import { m } from "framer-motion";
import { useRef, useState } from "react";

import { MenuToggle } from "../menu/menuToggle";
import MobileMenuContainer from "../menu/mobileMenuContainer";
import { SwipeableDrawer } from "@mui/material";

export default function MobileMenu() {
    const [menuOpen, setMenuOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    return (
        <m.div
            ref={ref}
            className="absolute right-0 top-0 h-screen w-0"
        >
            <SwipeableDrawer
                disableSwipeToOpen
                ref={ref}
                classes={{
                    paper: "overflow-hidden h-screen w-screen xs:w-[50vw] md:min-w-[15rem] !bg-surface-50/50 backdrop-blur-[8px] transition-colors duration-300 dark:!bg-surface-900/50 ",
                }}
                anchor="right"
                open={menuOpen}
                onClose={() => {
                    setMenuOpen(false);
                }}
                onOpen={() => {
                    setMenuOpen(true);
                }}
                variant="temporary"
            >
                <MobileMenuContainer
                    toggle={setMenuOpen}
                    open={menuOpen}
                />
            </SwipeableDrawer>
            <MenuToggle
                toggle={setMenuOpen}
                menuOpen={menuOpen}
            />
        </m.div>
    );
}
