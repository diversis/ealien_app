import * as React from "react";
import "@testing-library/jest-dom";
import {
    fireEvent,
    render,
    screen,
} from "@testing-library/react";

import HeroSection from "@/components/landing/hero/";
import { setupIntersectionObserverMock } from "__mocks__/lib/intersectionObserverMock";

describe("Hero", () => {
    beforeEach(() => {
        setupIntersectionObserverMock();
    });
    it("renders Hero", () => {
        render(<HeroSection />);
        expect(
            screen.getByTestId("hero-section"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("hero-section-article"),
        ).toBeInTheDocument();

        // screen.debug();
    });
});
