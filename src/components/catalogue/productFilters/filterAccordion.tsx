import {
    Dispatch,
    ReactNode,
    useEffect,
    useState,
    SetStateAction,
} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Box,
    AccordionActions,
    Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FilterAccordion({
    label,

    children,
    isActive,
    handleClearFilter,
}: {
    label: string;

    children: ReactNode;
    isActive: boolean;
    handleClearFilter: () => void;
}) {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Box className="flex flex-row items-center gap-4">
                    <Typography
                        id={`filters-${label}-label`}
                    >
                        {label}
                    </Typography>

                    {isActive ? (
                        <Button
                            variant="text"
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleClearFilter();
                            }}
                            classes={{ root: "!py-0" }}
                        >
                            <ClearIcon />
                        </Button>
                    ) : null}
                </Box>
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
    );
}
