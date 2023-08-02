import { Controller, useController } from "react-hook-form";
import TextField, {
    TextFieldProps,
} from "@mui/material/TextField";
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
    ...rest
}: InputProps<TFieldValues, TName> & TextFieldProps) => {
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
                    
                    {...rest}
                />
            )}
        />
    );
};
