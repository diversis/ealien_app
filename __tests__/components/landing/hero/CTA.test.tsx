import * as React from "react";
import "@testing-library/jest-dom";
import {
    fireEvent,
    render,
    screen,
} from "@testing-library/react";

import CTA from "@/components/landing/hero/CTA";
import { setupIntersectionObserverMock } from "__mocks__/lib/intersectionObserverMock";

describe("CTA", () => {
    beforeEach(() => {
        setupIntersectionObserverMock();
    });
    it("renders CTA", () => {
        render(<CTA mousePosition={{ x: 0, y: 0 }} />);
        expect(
            screen.getByTestId("hero-section-cta"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId(
                "hero-section-animated-div-title",
            ),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("hero-section-h1"),
        ).toBeInTheDocument();
        expect(
            screen.getByTestId(
                "hero-section-animated-div-p",
            ),
        ).toBeInTheDocument();
        expect(
            screen.getByTestId("hero-section-p"),
        ).toBeInTheDocument();
        expect(
            screen.getByTestId("hero-section-p-balancer"),
        ).toBeInTheDocument();

        // screen.debug();
    });
});
