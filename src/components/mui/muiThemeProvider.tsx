import { ReactNode } from "react";
import {
    createTheme,
    ThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
    CacheProvider,
    EmotionCache,
} from "@emotion/react";
import { useTheme } from "next-themes";
import NextAppDirEmotionCacheProvider from "./EmotionCache";

const fontFamily = [
    "Orbitron",
    "ui-sans-serif",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "Noto Sans",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji",
].join(",");

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#6547EB",
            contrastText: "#EDFDFD",
        },
        secondary: {
            main: "#0C6E6E",
            contrastText: "#EAD9FC",
        },
        background: {
            default: "#141414",
            paper: "#292929",
        },
        text: {
            primary: "#EBEBEB",
            secondary: "#EAD9FC",
            disabled: "#C2C2C2",
        },
    },
    typography: {
        fontFamily: fontFamily,
    },
});

const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#B2A3F5",
            contrastText: "#141414",
        },
        secondary: {
            main: "#18DCDC",
            contrastText: "#141414",
        },
        background: {
            default: "#F0EDFD",
            paper: "#EBEBEB",
        },
        text: {
            primary: "#141414",
            secondary: "#28064B",
            disabled: "#3D3D3D",
        },
    },
    typography: {
        fontFamily: fontFamily,
    },
});

export default function MUIThemeProvider({
    children,
}: {
    children: ReactNode;
}) {
    const { systemTheme, theme, setTheme, resolvedTheme } =
        useTheme();

    return (
        <NextAppDirEmotionCacheProvider
            options={{ key: "mui" }}
        >
            <ThemeProvider
                theme={
                    resolvedTheme === "dark"
                        ? darkTheme
                        : lightTheme
                }
            >
                <CssBaseline />
                {children}
            </ThemeProvider>
        </NextAppDirEmotionCacheProvider>
    );
}
