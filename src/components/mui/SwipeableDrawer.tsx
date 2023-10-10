import { ReactNode, useState } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { DRAWER_BLEEDING } from "@/lib/constants";
import Box from "@mui/material/Box";
import { Paper, Typography } from "@mui/material";

export default function MUISwipeableDrawer({
    children,
    title,
}: {
    children: ReactNode;
    title: string;
}) {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    return (
        <SwipeableDrawer
            SwipeAreaProps={{ sx: { zIndex: 100 } }}
            swipeAreaWidth={DRAWER_BLEEDING}
            anchor="bottom"
            disableSwipeToOpen={false}
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            ModalProps={{
                keepMounted: true,
            }}
            classes={{
                root: "z-[1100]",
                paper: "!overflow-y-visible ",
            }}
        >
            <Box className="visible absolute inset-x-0 -top-14 z-[1100] flex h-14 items-center">
                <Box className="absolute left-[calc(50%_-_32px)] top-1 h-2 w-8 rounded bg-surface-400 dark:bg-surface-600"></Box>
                <Paper className="flex h-full w-full items-center px-2">
                    <Typography variant="h5">
                        {title}
                    </Typography>
                </Paper>
            </Box>
            <Paper className="relative flex h-full max-h-[calc(100vh-3.5rem)] w-full justify-center overflow-auto">
                <Box className="w-[calc(100%-10px)] ">
                    {children}
                </Box>
            </Paper>
        </SwipeableDrawer>
    );
}
