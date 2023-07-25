import { NextRequest } from "next/server";

const logger = require("@/lib/utils/logger");
const catalogueLogger = logger.child({
    origin: "API catalogue",
});

export async function GET(request: NextRequest) {
    // logger.info({ request });
    const req = await request.json();
    logger.info({ req });
}


