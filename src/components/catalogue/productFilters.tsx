import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Box,
} from "@mui/material";

export default function ProductFilters() {
    return (
        <Accordion>
            <AccordionSummary>Category</AccordionSummary>
            <AccordionDetails>
                <Box className="flex flex-col">
                    <Button
                        variant="text"
                        onClick={() => {}}
                    >
                        Guitars
                    </Button>
                    <Button
                        variant="text"
                        onClick={() => {}}
                    >
                        Violins
                    </Button>
                    <Button
                        variant="text"
                        onClick={() => {}}
                    >
                        Pianos
                    </Button>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
}


