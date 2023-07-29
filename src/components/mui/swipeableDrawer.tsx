import { ReactNode, useState } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { DRAWER_BLEEDING } from "@/lib/constants";
import Box from "@mui/material/Box";
import { Paper, Typography } from "@mui/material";

export default function MUISwipeableDrawer({
    children,
}: {
    children: ReactNode;
}) {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    return (
        <SwipeableDrawer
            swipeAreaWidth={DRAWER_BLEEDING}
            anchor="bottom"
            disableSwipeToOpen={false}
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            ModalProps={{
                keepMounted: true,
            }}
            classes={{ paper: "!overflow-y-visible" }}
        >
            <Box className="visible absolute inset-x-0 -top-14 z-[9000] flex h-14 items-center">
                <Box className="absolute left-[calc(50%_-_32px)] top-1 h-2 w-8 rounded bg-surface-400 dark:bg-surface-600"></Box>
                <Paper className="flex h-full w-full items-center px-2">
                    <Typography variant="h5">
                        Filters
                    </Typography>
                </Paper>
            </Box>
            <Box className="h-full overflow-y-auto overflow-x-hidden p-1">
                {children}
            </Box>
        </SwipeableDrawer>
    );
}
