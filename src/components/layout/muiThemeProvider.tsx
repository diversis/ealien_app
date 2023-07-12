import { ReactNode } from "react";
import {
    createTheme,
    ThemeProvider,
} from "@mui/material/styles";
import { useTheme } from "next-themes";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const lightTheme = createTheme({
    palette: {
        mode: "light",
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
        <ThemeProvider
            theme={
                resolvedTheme === "light"
                    ? lightTheme
                    : darkTheme
            }
        >
            {children}
        </ThemeProvider>
    );
}
