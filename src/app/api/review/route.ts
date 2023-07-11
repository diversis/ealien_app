import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import {
    type ZodString,
    z,
    ZodError,
    ZodObject,
} from "zod";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const logger = require("@/lib/utils/logger");
const reviewLogger = logger.child({ origin: "API review" });

const formSchema = z
    .string()
    .min(3, "Review must include at least 3 characters")
    .max(1200, "Review too long (1200 characters max)");

export async function POST(
    request: NextRequest,
    response: NextResponse,
) {
    const req = await request.json();
    const res = await response.json();
    logger.info("POST data: ");
    logger.info(req.body);
    const session = await getServerSession(
        req,
        res,
        authOptions,
    );
    if (!session)
        return res
            .status(401)
            .json({ message: "session was not provided" });

    formSchema.parse(req.body);

    logger.info("CREATE REVIEW", req.body);
}
