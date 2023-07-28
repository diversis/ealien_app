import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import { Dispatch, SetStateAction, useState } from "react";
import { Input, Typography } from "@mui/material";

function valuetext(value: number) {
    return `$${value}`;
}

export default function FilterPrice({
    setFilters,
}: {
    setFilters: Dispatch<
        SetStateAction<{
            [key: string]: string | null;
        }>
    >;
}) {
    const [price, setPrice] = useState<number[]>([
        0, 10000,
    ]);
    const handleChange = (
        event: Event,
        newValue: number | number[],
    ) => {
        setPrice(newValue as number[]);
    };

    const handleBlurMin = () => {
        if (price[0] < 0) {
            setPrice((state) => [0, state[1]]);
        }
    };
    const handleBlurMax = () => {
        if (price[1] > 100) {
            setPrice((state) => [state[0], 10000]);
        }
    };

    return (
        <Box className="flex flex-col">
            <Slider
                getAriaLabel={() => "Temperature range"}
                value={price}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
            />
            <Box className="flex flex-row flex-wrap gap-2">
                <Box className="flex flex-row gap-2">
                    <Typography id="price-from">
                        From
                    </Typography>
                    <Input
                        value={price[0]}
                        onChange={(event) =>
                            setPrice((state) => [
                                event.target.value === ""
                                    ? 0
                                    : Number(
                                          event.target
                                              .value,
                                      ),
                                state[1],
                            ])
                        }
                        onBlur={handleBlurMin}
                        inputProps={{
                            step: 10,
                            min: 0,
                            max: 10000,
                            type: "number",
                            "aria-labelledby": "price-from",
                        }}
                    />
                </Box>
                <Box className="flex flex-row gap-2">
                    <Typography>to</Typography>
                    <Input
                        value={price[1]}
                        onChange={(event) =>
                            setPrice((state) => [
                                state[0],
                                event.target.value === ""
                                    ? 0
                                    : Number(
                                          event.target
                                              .value,
                                      ),
                            ])
                        }
                        onBlur={handleBlurMin}
                        inputProps={{
                            step: 10,
                            min: 0,
                            max: 10000,
                            type: "number",
                            "aria-labelledby": "price-from",
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}
