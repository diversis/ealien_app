"use client";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { MenuToggle } from "../menu/menuToggle";
import { useOnClickOutside } from "usehooks-ts";
import MobileMenuContainer from "../menu/mobileMenuContainer";

export default function MobileMenu() {
    const [menuOpen, setMenuOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, async () => { if (menuOpen) { return await setMenuOpen(false) } });

    return (
        <m.div ref={ref} className="absolute right-0 top-0 h-screen w-0">
            <AnimatePresence >
                {menuOpen ? <MobileMenuContainer toggle={setMenuOpen} /> : null}
            </AnimatePresence>
            <MenuToggle toggle={setMenuOpen} menuOpen={menuOpen} />
        </m.div>
    );
}
