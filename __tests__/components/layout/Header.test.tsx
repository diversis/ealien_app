import * as React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "__mocks__/next-auth";
import Header from "@/components/layout/Header";
import { setupIntersectionObserverMock } from "__mocks__/lib/intersectionObserverMock";
import { MAIN_MENU_LINKS } from "@/lib/nav/main-menu";
import { USER_MENU_LINKS } from "@/lib/nav/user-menu";

describe("Header", () => {
    beforeEach(() => {
        setupIntersectionObserverMock();
    });
    it("renders Header", async () => {
        const user = userEvent.setup();
        render(<Header />);

        expect(
            screen.getByTestId("header"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("menu-desktop-wrapper"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("menu-desktop-container"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("menu-desktop-toolbar"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("menu-desktop-logo-h6"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("menu-desktop-links-box"),
        ).toBeInTheDocument();

        MAIN_MENU_LINKS.map((page) =>
            expect(
                screen.getByTestId(
                    `menu-desktop-links-${page.title}`,
                ),
            ).toBeInTheDocument(),
        );

        expect(
            screen.getByTestId(
                "menu-desktop-buttons-container",
            ),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("menu-desktop-user-box"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("menu-desktop-user-button"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("menu-desktop-user-avatar"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("menu-desktop-user-menu"),
        ).toBeInTheDocument();

        USER_MENU_LINKS.map((setting) => {
            expect(
                screen.getByTestId(
                    `menu-desktop-user-menuitem-${setting.title}`,
                ),
            ).toBeInTheDocument();

            expect(
                screen.getByTestId(
                    `menu-desktop-user-menuitem-link-${setting.title}`,
                ),
            ).toBeInTheDocument();

            expect(
                screen.getByTestId(
                    `menu-desktop-user-menuitem-link-title-${setting.title}`,
                ),
            ).toBeInTheDocument();
        });

        expect(
            screen.getByTestId(
                "menu-desktop-user-menuitem-logout",
            ),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId(
                "menu-desktop-user-menuitem-logout-button",
            ),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId(
                "menu-desktop-user-menuitem-logout-icon",
            ),
        ).toBeInTheDocument();

        await user.click(
            screen.getByTestId(
                "menu-desktop-user-menuitem-logout-button",
            ),
        );

        screen.debug(undefined, Infinity);

        // expect(
        //     screen.getByTestId(
        //         "menu-desktop-user-menuitem-login",
        //     ),
        // ).toBeInTheDocument();

        // expect(
        //     screen.getByTestId(
        //         "menu-desktop-user-menuitem-login-button",
        //     ),
        // ).toBeInTheDocument();

        // expect(
        //     screen.getByTestId(
        //         "menu-desktop-user-menuitem-login-icon",
        //     ),
        // ).toBeInTheDocument();
    });
});
