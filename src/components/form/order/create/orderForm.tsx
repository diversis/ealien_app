"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, m } from "framer-motion";
import { useSession } from "next-auth/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
    Controller,
    FieldValues,
    FormProvider,
    SubmitErrorHandler,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import z, { ZodError, ZodIssue } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnackbar } from "notistack";
import Stepper from "@mui/material/Stepper";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { StepIconProps } from "@mui/material/StepIcon";

import { useCart } from "@/lib/hooks/use-cart";
import COUNTRIES_DATA from "@/lib/rest-countries/countries.json";
import useWindowSize from "@/lib/hooks/use-window-size";
// import SelectCountryItem from "./selectCountryItem";
import { CartItem } from "@/lib/prisma/types";

import { OPACITY_VARIANTS } from "@/lib/constants";
import { ControlledTextField } from "../../fields/controlledTextField";
import { ControlledCountrySelect } from "../../fields/controlledCountrySelect";
import { ControlledRadioGroup } from "../../fields/controlledRadioGroup";
import {
    Box,
    CircularProgress,
    Step,
    StepContent,
    StepLabel,
    Typography,
} from "@mui/material";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";
import StepFour from "./stepFour";

const schema = z.object({
    name: z
        .string()
        .min(3, "Name must include at least 3 characters")
        .max(40, "Name too long"),
    email: z
        .string()
        .email("Invalid email")
        .nonempty("Email is required"),
    address: z.string().nonempty("Address is required"),
    city: z.string().nonempty("City is required"),
    postalCode: z
        .string()
        .nonempty("Postal Code is required"),
    country: z.string().nonempty("Country is required"),
    paymentMethod: z
        .string()
        .nonempty(
            "Please choose one of available payment methods",
        ),
});

type FormSchemaType = FieldValues & z.infer<typeof schema>;
type FormField =
    | "name"
    | "email"
    | "address"
    | "city"
    | "postalCode"
    | "country"
    | "paymentMethod";

async function saveFormData({
    data,
    url,
}: {
    data: FieldValues & { items: CartItem[] };
    url: string;
}): Promise<AxiosResponse<any, any>> {
    return await axios({
        method: "post",
        url: url,
        data: data,
    });
}

const endpoint = "/api/order/create";

const steps = [
    "Personal information",
    "Shipping",
    "Payment",
];

export default function OrderForm() {
    const {
        items,
        addItem,
        removeItem,
        clearCart,
        addQty,
        editable,
        show,
        toggle,
        setEditable,
    } = useCart((state) => ({
        items: state.items,
        addItem: state.addItem,
        removeItem: state.removeItem,
        clearCart: state.clearCart,
        addQty: state.addQty,
        editable: state.editable,
        setEditable: state.setEditable,
        show: state.show,
        toggle: state.toggleCart,
    }));

    const router = useRouter();
    const { data: session, status } = useSession();
    const { email, image, name } = session?.user || {};

    const { enqueueSnackbar, closeSnackbar } =
        useSnackbar();

    const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: email || "",
            address: "",
            city: "",
            postalCode: "",
            country: "",
            paymentMethod: "paypal",
        },
    });
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
        clearErrors,
        formState: {
            isSubmitting,
            errors,
            isSubmitSuccessful,
            isDirty,
            isValid,
        },
    } = methods;

    const { isMobile, isDesktop } = useWindowSize();
    const [active, setActive] = useState(0);
    const [formVisible, setFormVisible] = useState(false);
    const [newOrderId, setNewOrderId] = useState("");

    const onError: SubmitErrorHandler<FormSchemaType> = (
        {
            name,
            email,
            address,
            city,
            postalCode,
            country,
            paymentMethod,
        },
        e,
    ) => {
        console.log("onError errors: ", errors);
        try {
            for (const [field, message] of Object.entries(
                errors,
            )) {
                // console.log(field, message);
                setActive(0);
            }
            const errorsMessage = Object.entries(
                errors,
            ).reduce(
                (m, [field, message]) => m + field + ", ",
                "",
            );

            enqueueSnackbar({
                message: `Fields with errors:${errorsMessage}`,
                variant: "error",
            });
        } catch (e) {
            console.error(errors, e);
        }
        setEditable(true);
    };
    const onSubmit: SubmitHandler<FormSchemaType> = async (
        data: FieldValues,
    ) => {
        try {
            clearErrors("root");
            console.log({ ...data, items });
            const orderData: FieldValues & {
                items: CartItem[];
            } = {
                ...data,
                items: items.filter((i) => i.qty > 0),
            };
            const response = await saveFormData({
                data: orderData,
                url: endpoint,
            });
            console.log(response);
            setNewOrderId(response.data.orderId);
            clearCart();
            enqueueSnackbar({
                message: `Order create success. Order ID: ${response.data.orderId}`,
                variant: "success",
                autoHideDuration: 6000,
            });
            router.push(
                `/order/${response.data.orderId || "#"}`,
            );
        } catch (error) {
            console.log("axios?: ", error);
            if (error instanceof AxiosError) {
                //Received message from API ?
                if (
                    error?.response?.data &&
                    Array.isArray(error.response.data)
                ) {
                    let BackToStep = 3;
                    const data: ZodIssue[] =
                        error.response.data;
                    // console.log(error);
                    // Validation error
                    const fieldToErrorMessage: {
                        field: string;
                        message: string;
                    }[] = data.map((e) => {
                        return {
                            field: "" + e.path[0],
                            message: e.message,
                        };
                    });
                    console.error(fieldToErrorMessage);
                    fieldToErrorMessage.map(
                        ({ field, message }) => {
                            if (field in getValues()) {
                                setError(
                                    field as FormField,
                                    {
                                        type: "custom",
                                        message: message,
                                    },
                                );
                                if (
                                    field in
                                    ["name", "email"]
                                ) {
                                    BackToStep = -1;
                                } else if (
                                    field in
                                    [
                                        "address",
                                        "city",
                                        "postalCode",
                                        "country",
                                    ]
                                ) {
                                    BackToStep = Math.min(
                                        BackToStep,
                                        0,
                                    );
                                } else {
                                    BackToStep = Math.min(
                                        BackToStep,
                                        1,
                                    );
                                }
                            }
                        },
                    );
                    console.log(
                        "redirectForm: ",
                        BackToStep,
                    );
                    setActive(BackToStep);
                    const errorMessage =
                        fieldToErrorMessage.reduce(
                            (m, { field }) =>
                                m + field + ", ",
                            "",
                        );
                    enqueueSnackbar({
                        message: `Errors occured while creating order:\n Fields with errors:\n ${errorMessage}`,
                        variant: "error",
                    });
                } else {
                    setError("root", {
                        type: "serverError",
                        message: error.message,
                    });
                    enqueueSnackbar({
                        message: `${error.response?.statusText}`,
                        variant: "error",
                    });
                }
            } else {
                // unknown error
                console.error(error);
                setError("root", {
                    type: "serverError",
                    message:
                        error &&
                        typeof error === "object" &&
                        "message" in error
                            ? (error.message as string)
                            : "server error",
                });
                enqueueSnackbar({
                    message: `An unexpected error occurred while processing, please try again`,
                    variant: "error",
                });
            }
            setEditable(true);
        }
    };

    const nextStep = async () => {
        let result = true;
        switch (active) {
            case 0: {
                if (email) {
                    setValue("name", name || "");
                    setValue("email", email || "");
                }
                result = await trigger(["name", "email"]);
                console.log("result:", result);
                break;
            }
            case 1: {
                result = await trigger([
                    "address",
                    "city",
                    "postalCode",
                    "country",
                ]);
                console.log("result:", result);
                break;
            }
            case 2: {
                result = await trigger(["paymentMethod"]);
                break;
            }
            default:
                break;
        }
        console.log(errors);
        setActive((current) => {
            return current < 3 && result
                ? current + 1
                : current;
        });
    };
    useEffect(() => {
        console.log(active);
    }, [active]);

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    useEffect(() => {
        console.log(
            `\n-----\n name:  ${getValues(
                "name",
            )}\n-----\n email:  ${getValues(
                "email",
            )}\n-----\n address:  ${getValues(
                "address",
            )}\n-----\n city:  ${getValues(
                "city",
            )}\n-----\n country:  ${getValues(
                "country",
            )}\n-----\n postalCode:  ${getValues(
                "postalCode",
            )}\n-----\n paymentMethod:  ${getValues(
                "paymentMethod",
            )}\n-----\n`,
        );
    });

    useEffect(() => {
        console.log(
            "submit success?: ",
            isSubmitSuccessful,
        );
        if (isSubmitting || isSubmitSuccessful) {
            setEditable(false);
        }
        return () => setEditable(true);
    }, [isSubmitting, isSubmitSuccessful, setEditable]);

    const prevStep = () =>
        setActive((current) =>
            current > 0 ? current - 1 : current,
        );

    // const { isMobile, isTablet, isDesktop } = useWindowSize();
    const handleProceed = () => {
        setFormVisible(true);
    };
    return (
        <>
            <AnimatePresence mode="wait">
                {items.length > 0 && (
                    <m.div
                        key="order-form-wrapper"
                        className="w-full [&>*]:!scale-100 "
                        layout="size"
                        transition={{
                            layout: {
                                type: "spring",
                                stiffness: 150,
                                mass: 0.3,
                            },
                        }}
                    >
                        <FormProvider {...methods}>
                            {!isSubmitSuccessful ? (
                                <m.form
                                    id="create-order-form"
                                    key={`order-form`}
                                    onSubmit={handleSubmit(
                                        onSubmit,
                                        onError,
                                    )}
                                    variants={
                                        OPACITY_VARIANTS
                                    }
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="flex flex-col gap-y-2 rounded-xl bg-primary-50/50 p-2 transition-[height] duration-1000 dark:bg-primary-900/50 md:gap-y-4"
                                >
                                    <Stepper
                                        activeStep={active}
                                    >
                                        {steps.map(
                                            (label) => {
                                                return (
                                                    <Step
                                                        key={`step-${label}`}
                                                    >
                                                        <StepLabel
                                                            StepIconComponent={
                                                                StepIcon
                                                            }
                                                        >
                                                            {
                                                                label
                                                            }
                                                        </StepLabel>
                                                    </Step>
                                                );
                                            },
                                        )}
                                    </Stepper>
                                    <Box
                                        sx={{
                                            marginTop: {
                                                xs: "6px",
                                                sm: "8px",
                                                md: "12px",
                                                lg: "24px",
                                            },
                                        }}
                                    >
                                        {active === 0 ? (
                                            <StepOne
                                                session={
                                                    session
                                                }
                                            />
                                        ) : active === 1 ? (
                                            <StepTwo />
                                        ) : active === 2 ? (
                                            <StepThree />
                                        ) : active === 3 ? (
                                            <StepFour />
                                        ) : null}
                                    </Box>
                                    <Box className="flex w-full flex-row">
                                        <Box className="ml-0 mr-auto">
                                            {active > 0 ? (
                                                <Button
                                                    type="button"
                                                    onClick={
                                                        prevStep
                                                    }
                                                >
                                                    Back
                                                </Button>
                                            ) : null}
                                        </Box>
                                        <Box className="ml-auto mr-0">
                                            {active <
                                            steps.length ? (
                                                <Button
                                                    key="next-step"
                                                    type="button"
                                                    onClick={
                                                        nextStep
                                                    }
                                                    color="secondary"
                                                    variant="contained"
                                                    className="relative"
                                                >
                                                    Next
                                                </Button>
                                            ) : (
                                                <Button
                                                    key="create-order"
                                                    // form="create-order-form"
                                                    type="submit"
                                                    disabled={
                                                        isSubmitting
                                                    }
                                                    color="secondary"
                                                    variant="contained"
                                                    className="relative"
                                                >
                                                    {isSubmitting ? (
                                                        <CircularProgress
                                                            thickness={
                                                                6
                                                            }
                                                            size={
                                                                32
                                                            }
                                                            className="absolute mx-auto "
                                                        />
                                                    ) : null}
                                                    <Typography
                                                        className={`${
                                                            isSubmitting
                                                                ? "opacity-0"
                                                                : ""
                                                        }`}
                                                    >
                                                        Create
                                                        Order
                                                    </Typography>
                                                </Button>
                                            )}
                                        </Box>
                                    </Box>
                                </m.form>
                            ) : (
                                <m.div className="flex justify-center rounded-xl bg-primary-50/50 p-2 transition-colors duration-1000 dark:bg-primary-900/50">
                                    <Link
                                        href={`/order/${
                                            newOrderId ||
                                            "#"
                                        }`}
                                    >
                                        View Order
                                    </Link>
                                </m.div>
                            )}
                        </FormProvider>
                    </m.div>
                )}
            </AnimatePresence>
        </>
    );
}

function StepIcon({
    active,
    completed,
    error,
    className,
    icon,
}: StepIconProps) {
    const icons: { [index: string]: React.ReactElement } = {
        1: <PersonIcon />,
        2: <LocationCityIcon />,
        3: <CreditCardIcon />,
    };
    const fillColor = active
        ? "text-primary-500"
        : completed
        ? "text-green-500"
        : error
        ? "text-red-500"
        : "";
    return (
        <div className={`${fillColor} ${className}`}>
            {icons[String(icon)]}
        </div>
    );
}
