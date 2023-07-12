import { Controller, useController } from "react-hook-form";
import TextField from "@mui/material/TextField";
import type {
    SubmitHandler,
    DefaultValues,
    FieldValues,
    FieldPath,
    UseControllerProps,
} from "react-hook-form";
type InputProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName>;

export const ControlledTextField = <
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
                <TextField
                    helperText={
                        error ? error.message : null
                    }
                    size="small"
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    label={''+label}
                    fullWidth
                    variant="outlined"
                    className="rounded-md bg-surface-100/50 "
                />
            )}
        />
    );
};
