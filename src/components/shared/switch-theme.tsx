"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
// import {
//     useTheme as useMUITheme,
//     ThemeProvider,
//     createTheme,
// } from "@mui/material/styles";

// import { AnimatePresence, m } from "framer-motion";
// import { FaMoon, FaSun } from "react-icons/fa";

import {
    MOON_VARIANTS,
    SUN_VARIANTS,
} from "@/lib/constants";
import Switch from "@mui/material/Switch";

const SwitchTheme = () => {
    const { systemTheme, theme, setTheme, resolvedTheme } =
        useTheme();
    const [checked, setChecked] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    useIsomorphicLayoutEffect(() => {
        setChecked(resolvedTheme === "light");
        // if (
        //     resolvedTheme === "light" ||
        //     resolvedTheme === "dark"
        // ) {
        //     createTheme({
        //         palette: {
        //             mode: resolvedTheme,
        //         },
        //     });
        // }
    }, [resolvedTheme]);

    if (!mounted) return null;
    return (
        <Switch
            title={
                theme === "light"
                    ? "Сменить тему на темную"
                    : "Сменить тему на светлую"
            }
            checked={resolvedTheme === "dark"}
            className="h-10"
            onChange={async () =>
                await setTheme(
                    theme === "dark" ? "light" : "dark",
                )
            }
        />
    );
};
export default SwitchTheme;
