import {
    Box,
    Divider,
    Paper,
    Skeleton,
} from "@mui/material";

export default function ReviewPlaceholder() {
    return (
        <Paper className="grid w-full grid-cols-[auto_2px_1fr] items-center gap-4 p-2">
            <Box className="flex flex-col gap-2">
                <Skeleton
                    variant="text"
                    className="w-full"
                    height={30}
                ></Skeleton>
                <Skeleton
                    variant="circular"
                    className="w-24"
                    height={96}
                ></Skeleton>
                <Skeleton
                    variant="text"
                    className="w-full"
                    height={30}
                ></Skeleton>
            </Box>
            <Divider
                variant="middle"
                orientation="vertical"
            />
            <Box className="grid h-full grid-cols-1 grid-rows-[auto_2px_1fr] gap-2 self-start">
                <Skeleton
                    variant="text"
                    className="h-full w-full"
                    height={30}
                ></Skeleton>
                <Divider />
                <Skeleton
                    variant="rounded"
                    className="h-full w-full"
                    height={120}
                ></Skeleton>
            </Box>
        </Paper>
    );
}
