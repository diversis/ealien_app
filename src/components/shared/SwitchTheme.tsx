"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import Switch from "@mui/material/Switch";
import { Box } from "@mui/material";

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
    }, [resolvedTheme]);

    if (!mounted) return null;
    return (
        <Box className="flex flex-row items-center gap-0">
            <LightModeIcon
                width={16}
                height={16}
                className="text-secondary-400 transition-colors duration-500 dark:text-surface-600"
            />
            <Switch
                inputProps={{
                    "aria-label": "Switch theme",
                }}
                title={
                    theme === "light"
                        ? "Switch to dark theme"
                        : "Switch to light theme"
                }
                checked={resolvedTheme === "dark"}
                className="h-10"
                onChange={async () =>
                    await setTheme(
                        theme === "dark" ? "light" : "dark",
                    )
                }
            />
            <DarkModeIcon
                width={16}
                height={16}
                className="text-surface-600 transition-colors duration-500 dark:text-tertiary-500"
            />
        </Box>
    );
};
export default SwitchTheme;
