import * as React from "react";
import "@testing-library/jest-dom";
import {
    fireEvent,
    render,
    screen,
} from "@testing-library/react";

import ToggleCart from "@/components/cart/ToggleCart";

describe("ToggleCart", () => {
    it("renders ToggleCart", () => {
        render(<ToggleCart />);
        expect(
            screen.getByTestId("togglecart-badge"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("togglecart-button"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("togglecart-cart-icon"),
        ).toBeInTheDocument();

        // screen.debug();
    });
});
