import { Controller, useController } from "react-hook-form";
import TextField from "@mui/material/TextField";
import type {
    SubmitHandler,
    DefaultValues,
    FieldValues,
    FieldPath,
    UseControllerProps,
} from "react-hook-form";
import RadioGroup from "@mui/material/RadioGroup";
type InputProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName>;

export const ControlledRadioGroup = <
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
>({
    name,
    control,
    label,
}: InputProps<TFieldValues, TName> & {
    label?: string;
}) => {
    const { field } = useController({ control, name });
    return (
        <Controller
            name={name}
            control={control}
            render={({
                field: { onChange, value },
                fieldState: { error },
                formState,
            }) => (
                <RadioGroup
                    onChange={onChange}
                    value={value}
                />
            )}
        />
    );
};
