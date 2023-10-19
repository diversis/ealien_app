interface MockSession {
    expires?: string;
    user?: { username: string; email: string };
}

jest.mock("next-auth/react", () => {
    const originalModule = jest.requireActual(
        "next-auth/react",
    );
    let mockSession: MockSession = {
        expires: new Date(
            Date.now() + 2 * 86400,
        ).toISOString(),
        user: { username: "admin", email: "test@test.ts" },
    };
    let status = "authenticated";

    return {
        __esModule: true,
        ...originalModule,
        useSession: jest.fn(() => {
            return {
                data: mockSession,
                status:"authenticated",
            };
        }),
    };
});
