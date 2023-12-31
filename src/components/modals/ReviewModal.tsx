import {
    Dialog,
    DialogTitle,
    Button,
    Typography,
    Box,
    Divider,
    FormGroup,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackbar } from "notistack";
import {
    SubmitHandler,
    useForm,
    SubmitErrorHandler,
} from "react-hook-form";
import axios, { AxiosError, AxiosResponse } from "axios";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import StarIcon from "@mui/icons-material/Star";
import {
    ComponentPropsWithoutRef,
    Dispatch,
    forwardRef,
    useState,
    SetStateAction,
} from "react";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import { ControlledTextField } from "../form/fields/ControlledTextField";
import { Product } from "@prisma/client";
import { SerializedPrisma } from "@/lib/prisma/types";
import { ControlledRating } from "../form/fields/ControlledRating";

const endpoint = "/api/review";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface ReviewFields {
    review: string;
    rating: number;
}

interface ReviewModalProps
    extends ComponentPropsWithoutRef<"div"> {
    product: SerializedPrisma<Product>;
    setPosted: Dispatch<SetStateAction<boolean>>;
}

const schema = z.object({
    review: z
        .string()
        .min(3, "Review must include at least 3 characters")
        .max(1200, "Review too long (1200 characters max)"),
    rating: z.preprocess(
        (s) => Number(s),
        z
            .number()
            .min(0, "Rating can't be lower than 0")
            .max(5, "Rating can't be higher than 5"),
    ),
});

async function sendFormData({
    data,
    url,
}: {
    data: ReviewFields & { productId: string };
    url: string;
}): Promise<AxiosResponse<any, any>> {
    console.info("sending data: ", data);
    return await axios({
        method: "post",
        url: url,
        data: { ...data },
    });
}

export default function ReviewModal({
    product,
    setPosted,
    ...rest
}: ReviewModalProps) {
    const [open, setOpen] = useState(false);
    const { enqueueSnackbar, closeSnackbar } =
        useSnackbar();

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const {
        control,
        register,
        handleSubmit,
        setError,
        reset,
        setFocus,
        getValues,
        trigger,
        setValue,
        formState: {
            isSubmitting,
            errors,
            isSubmitSuccessful,
            isDirty,
            isValid,
        },
    } = useForm<ReviewFields>({
        resolver: zodResolver(schema),
        defaultValues: {
            review: "",
            rating: 0,
        },
    });

    const onSubmit: SubmitHandler<ReviewFields> = async (
        data,
        e,
    ) => {
        try {
            console.info("submit: ", data);
            const response = await sendFormData({
                data: { ...data, productId: product.id },
                url: endpoint,
            });
            if (response.status) {
                console.log(
                    "response.status ",
                    response.status,
                );
                enqueueSnackbar({
                    message: "Your review was posted",
                    variant: "success",
                    autoHideDuration: 6000,
                });
                setPosted(true);
                handleClose();
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                enqueueSnackbar({
                    message: error.response?.data?.message,
                    variant: "error",
                });
            }
            console.log(error);
            const res = {
                error: error,
            };
        }
    };

    const onError: SubmitErrorHandler<ReviewFields> = (
        { review },
        e,
    ) => {
        try {
            const errorFields = Object.entries(
                errors,
            ).reduce(
                (m, [field, message]) =>
                    m +
                    (field === "name" ? "Имя" : field) +
                    ", ",
                "",
            );
            enqueueSnackbar({
                message: errorFields,
                variant: "error",
            });
        } catch (e) {
            console.log(errors, e);
        }
    };
    // console.log(errors);
    return (
        <>
            <Button
                variant="contained"
                onClick={handleOpen}
                className="ml-auto"
            >
                Post a Review
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                keepMounted
                TransitionComponent={Transition}
                aria-labelledby="review-modal-title"
                aria-describedby="review-modal-description"
                className=""
                {...rest}
            >
                <FormGroup
                    className="relative flex w-[30vw] min-w-[20rem] flex-col gap-y-4  px-6 py-4 lg:min-w-[30rem]"
                    onSubmit={handleSubmit(
                        onSubmit,
                        onError,
                    )}
                >
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) =>
                                theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <DialogTitle
                        id="review-modal-title"
                        variant="h2"
                        className="!p-0 text-surface-900 dark:text-surface-50"
                    >
                        Review
                    </DialogTitle>
                    <Divider className="mb-2" />
                    <Box className="flex flex-col gap-y-4">
                        <Box className="flex flex-row">
                            <Typography
                                id="review-modal-description"
                                variant="body1"
                                className=" text-surface-900 dark:text-surface-50"
                            >
                                Compose a review for &quot;
                                {product.name}&quot;
                            </Typography>
                            <Typography
                                component={"label"}
                                className="!ml-2"
                            >
                                {product.rating || 0}
                            </Typography>
                            <StarIcon className="text-[#faaf00]" />
                        </Box>
                        <Box className="flex flex-row gap-2">
                            <Typography component={"label"}>
                                Rating
                            </Typography>

                            <ControlledRating
                                name="rating"
                                control={control}
                                label="rating"
                            />
                        </Box>
                        <ControlledTextField
                            name="review"
                            control={control}
                            label="Review"
                        />

                        {/* <Controller
                            name="review"
                            control={control}
                            render={({
                                field: {
                                    onChange,
                                    onBlur,
                                    value,
                                    name,
                                    ref,
                                },
                                fieldState: {
                                    invalid,
                                    isTouched,
                                    isDirty,
                                    error,
                                },
                                formState,
                            }) => (
                                <TextField
                                    autoFocus
                                    margin="normal"
                                    id="name"
                                    label="Review"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    className="rounded-md bg-surface-100/50 "
                                />
                            )}
                        /> */}
                    </Box>
                    <Box className="flex flex-row justify-end gap-4">
                        <Button
                            onClick={handleClose}
                            variant="contained"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit(onSubmit)}
                            type="submit"
                            variant="contained"
                        >
                            Submit
                        </Button>
                    </Box>
                </FormGroup>
            </Dialog>
        </>
    );
}
