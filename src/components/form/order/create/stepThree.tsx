import { useFormContext } from "react-hook-form";

import { ControlledRadioGroup } from "../../fields/controlledRadioGroup";
import {
    FormControlLabel,
    Radio,
    Stack,
} from "@mui/material";

export default function StepThree() {
    // const { data: session, status } = useSession();

    const { control } = useFormContext();

    return (
        <Stack
            direction="column"
            spacing={{ xs: 1, sm: 2, md: 4 }}
        >
            <ControlledRadioGroup
                name="paymentMethod"
                control={control}
                label="select preferred payment method"
                key="paymentMethod"
                id="paymentMethod"
                placeholder="Name"
                className="rounded-md"
            >
                <FormControlLabel
                    id="paypal"
                    value="paypal"
                    label="Paypal"
                    control={<Radio />}
                />
                <FormControlLabel
                    id="cc"
                    value="cc"
                    label="Credit Card"
                    control={<Radio />}
                    disabled
                />
            </ControlledRadioGroup>
        </Stack>
    );
}
