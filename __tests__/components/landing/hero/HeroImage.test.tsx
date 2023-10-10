import * as React from "react";
import "@testing-library/jest-dom";
import {
    fireEvent,
    render,
    screen,
} from "@testing-library/react";

import HeroImage from "@/components/landing/hero/HeroImage";
import { setupIntersectionObserverMock } from "__mocks__/lib/intersectionObserverMock";

describe("HeroImage", () => {
    beforeEach(() => {
        setupIntersectionObserverMock();
    });
    it("renders HeroImage", () => {
        render(
            <HeroImage mousePosition={{ x: 0, y: 0 }} />,
        );

        expect(
            screen.getByTestId(
                "hero-section-image-container",
            ),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("hero-section-image-svg"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId(
                "hero-section-image-svg-defs",
            ),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId(
                "hero-section-image-svg-defs-filter",
            ),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId(
                "hero-section-image-wrapper-1",
            ),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId(
                "hero-section-image-wrapper-2",
            ),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId(
                "hero-section-image-digits-wrapper",
            ),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId(
                "hero-section-image-digits-x",
            ),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId(
                "hero-section-image-digits-y",
            ),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("hero-section-image-Image"),
        ).toBeInTheDocument();

        // screen.debug();
    });
});
