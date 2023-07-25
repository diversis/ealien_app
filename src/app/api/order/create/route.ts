import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import {
    type ZodString,
    z,
    ZodError,
    ZodObject,
} from "zod";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createProductReview } from "@/lib/prisma/review";
import { createOrder } from "@/lib/prisma/order";
import { CartItem } from "@/lib/prisma/types";

const logger = require("@/lib/utils/logger");
const orderLogger = logger.child({
    origin: "API new order",
});

const formSchemaUnauthorized = z.object({
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

type FormSchemaUnauthorized = z.infer<
    typeof formSchemaUnauthorized
>;

const formSchemaAuthorized = z.object({
    name: z.string().optional(),
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

type FormSchemaAuthorized = z.infer<
    typeof formSchemaAuthorized
>;

export async function POST(request: NextRequest) {
    const req = await request.json();

    let orderId: string | null = null;
    try {
        logger.info("POST data: ");
        logger.info(req);
        logger.info("type data: " + typeof req.postalCode);
        const session = await getServerSession(authOptions);
        !!session
            ? formSchemaAuthorized.parse(req)
            : formSchemaUnauthorized.parse(req);
        logger.info("CREATE ORDER");
        logger.info({ req });
        logger.info("\n=============\n");
        const {
            name,
            email,
            address,
            city,
            country,
            postalCode,
            paymentMethod,
            items,
        } = req;

        if (session) {
            const order = await createOrder({
                userId: session.user.id,
                email: email,
                address: address,
                city: city,
                country: country,
                postalCode: postalCode,
                paymentMethod: paymentMethod,
                items: items,
                shippingPrice: 0,
            });
            if (order)
                return NextResponse.json(order, {
                    status: 200,
                });
            return NextResponse.json("server error", {
                status: 400,
            });
        }

        const order = await createOrder({
            customerName: name,
            email: email,
            address: address,
            city: city,
            country: country,
            postalCode: postalCode,
            paymentMethod: paymentMethod,
            items: items.filter((i: CartItem) => i.qty > 0),
            shippingPrice: 0,
        });

        logger.info({ order });

        return NextResponse.json(order, {
            status: 200,
        });
    } catch (e: unknown) {
        if (e instanceof ZodError) {
            logger.info(e.errors);

            // logger.info([...Object.values(e.errors)]);
            return NextResponse.json([...e.errors], {
                status: 400,
            });
        } else {
            logger.info(e);
            return NextResponse.json(e, {
                status: 400,
            });
        }

        return;
    }
}
