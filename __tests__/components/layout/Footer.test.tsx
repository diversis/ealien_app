import * as React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Footer from "@/components/layout/Footer";
import { setupIntersectionObserverMock } from "__mocks__/lib/intersectionObserverMock";

describe("Footer", () => {
    beforeEach(() => {
        setupIntersectionObserverMock();
    });
    it("renders Footer", () => {
        render(<Footer />);

        expect(
            screen.getByTestId("footer"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("footer-container"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("footer-logo-wrapper"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("footer-logo-Link"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("footer-logo-p"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("footer-social-wrapper"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("footer-c-wrapper"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("footer-c-p"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("footer-madeby-wrapper"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("footer-madeby-p"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("footer-madeby-a"),
        ).toBeInTheDocument();

        // screen.debug();
    });
});
