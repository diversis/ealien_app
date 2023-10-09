import * as React from "react";
import "@testing-library/jest-dom";
import {
    fireEvent,
    render,
    screen,
} from "@testing-library/react";

import Feature from "@/components/landing/features/Feature";
import guitarPhoto from "@public/images/catalogue/guitar/r/18/1024.webp";

describe("Feature", () => {
    it("renders Feature", () => {
        render(
            <Feature
                featureId={0}
                photo={guitarPhoto}
                text="test"
                title="test"
            />,
        );
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
