import * as React from "react";
import "@testing-library/jest-dom";
import {
    fireEvent,
    render,
    screen,
} from "@testing-library/react";

import Feature from "@/components/landing/features/Feature";
import guitarPhoto from "@public/images/catalogue/guitar/r/18/1024.webp";
import { setupIntersectionObserverMock } from "lib/jest/intersectionObserverMock";

for (let i = 0; i < 5; i++) {
    describe("Feature", () => {
        beforeEach(() => {
            setupIntersectionObserverMock();
        });
        it("renders Feature", () => {
            render(
                <Feature
                    featureId={i}
                    photo={guitarPhoto}
                    text="test"
                    title="test"
                />,
            );
            +i;
            expect(
                screen.getByTestId(`feature-${i}`),
            ).toBeInTheDocument();

            expect(
                screen.getByTestId(
                    `feature-${"" + i}-bg-backdrop-wrapper`,
                ),
            ).toBeInTheDocument();

            expect(
                screen.getByTestId(
                    `feature-${"" + i}-bg-backdrop-mask`,
                ),
            ).toBeInTheDocument();

            expect(
                screen.getByTestId(
                    `feature-${"" + i}-bg-backdrop`,
                ),
            ).toBeInTheDocument();

            expect(
                screen.getByTestId(
                    `feature-${"" + i}-article`,
                ),
            ).toBeInTheDocument();

            expect(
                screen.getByTestId(
                    `feature-${"" + i}-title`,
                ),
            ).toBeInTheDocument();

            expect(
                screen.getByTestId(
                    `feature-${"" + i}-hr-title`,
                ),
            ).toBeInTheDocument();

            expect(
                screen.getByTestId(
                    `feature-${"" + i}-text`,
                ),
            ).toBeInTheDocument();

            expect(
                screen.getByTestId(
                    `feature-${"" + i}-text-balancer`,
                ),
            ).toBeInTheDocument();

            expect(
                screen.getByTestId(
                    `feature-${"" + i}-hr-text`,
                ),
            ).toBeInTheDocument();

            // screen.debug();
        });
    });
}
