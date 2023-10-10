import * as React from "react";
import "@testing-library/jest-dom";
import {
    fireEvent,
    render,
    screen,
} from "@testing-library/react";

import CtaLink from "@/components/landing/cta/CtaLink";

describe("CtaLink", () => {
    it("renders CtaLink", () => {
        render(<CtaLink />);
        expect(
            screen.getByTestId("CtaLink-Link"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("CtaLink-doit"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("CtaLink-wrapper"),
        ).toBeInTheDocument();
        expect(
            screen.getByTestId("CtaLink-wrapper-left"),
        ).toBeInTheDocument();
        expect(
            screen.getByTestId("CtaLink-hover-left"),
        ).toBeInTheDocument();
        expect(
            screen.getByTestId("CtaLink-wrapper-right"),
        ).toBeInTheDocument();
        expect(
            screen.getByTestId("CtaLink-hover-right"),
        ).toBeInTheDocument();

        // screen.debug();
    });
});
