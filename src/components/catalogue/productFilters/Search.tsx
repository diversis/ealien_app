import Box from "@mui/material/Box";

import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
} from "react";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function FilterSearch({
    setFilters,
    searchKey,
}: {
    setFilters: Dispatch<
        SetStateAction<{
            [key: string]: string | null;
        }>
    >;
    searchKey: string | null;
}) {
    const handleChangeSearchKey = (
        event: ChangeEvent<
            HTMLTextAreaElement | HTMLInputElement
        >,
    ) => {
        setFilters((state) => ({
            ...state,
            searchKey:
                event.target.value === ""
                    ? null
                    : event.target.value,
        }));
    };

    return (
        <Box className="flex w-full flex-row place-items-center gap-2">
            <SearchIcon className="h-6 w-6 lg:h-8 lg:w-8" />
            <TextField
                onChange={handleChangeSearchKey}
                value={searchKey || ""}
                className="flex-grow [&_input]:p-1"
            />
        </Box>
    );
}
