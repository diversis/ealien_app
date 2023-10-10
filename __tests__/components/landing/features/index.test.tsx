import * as React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Features from "@/components/landing/features/";
import { setupIntersectionObserverMock } from "__mocks__/lib/intersectionObserverMock";

describe("Feature", () => {
    beforeEach(() => {
        setupIntersectionObserverMock();
    });
    it("renders Feature", () => {
        render(<Features />);

        expect(
            screen.getByTestId("features-section"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("features-text"),
        ).toBeInTheDocument();

        // screen.debug();
    });
});
