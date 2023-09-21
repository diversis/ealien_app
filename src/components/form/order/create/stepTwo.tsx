import { useFormContext } from "react-hook-form";

import { ControlledTextField } from "../../fields/controlledTextField";

import { ControlledCountrySelect } from "../../fields/controlledCountrySelect";
import { Stack } from "@mui/material";

export default function StepTwo() {
    // const { data: session, status } = useSession();

    const { reset, register, control } = useFormContext();

    return (
        <Stack
            direction="column"
            spacing={{ xs: 1, sm: 2, md: 4 }}
        >
            <ControlledTextField
                name="address"
                control={control}
                label="Address"
                key="address"
                id="address"
                placeholder="Address"
                autoComplete="street-address"
                variant="outlined"
                className="rounded-md"
                fullWidth
            />
            <ControlledTextField
                name="city"
                control={control}
                key="city"
                id="city"
                label="City"
                placeholder="city"
                autoComplete="home city"
                variant="outlined"
                className="rounded-md"
                fullWidth
            />
            <ControlledTextField
                name="postalCode"
                control={control}
                key="postalCode"
                id="postalCode"
                label="Postal code"
                placeholder="postalCode"
                autoComplete="postal-code"
                variant="outlined"
                className="rounded-md"
                fullWidth
            />
            <ControlledCountrySelect
                name="country"
                control={control}
                key="country"
            />
        </Stack>
    );
}
