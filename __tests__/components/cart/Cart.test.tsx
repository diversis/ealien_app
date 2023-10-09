import * as React from "react";
import "@testing-library/jest-dom";
import {
    fireEvent,
    render,
    screen,
} from "@testing-library/react";

import Cart from "@/components/cart/Cart";

describe("Cart", () => {
    it("renders Cart", () => {
        render(<Cart />);
        expect(
            screen.getByTestId("cart-swipable-drawer"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("cart-icon-close"),
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("cart-empty-text"),
        ).toBeInTheDocument();

        // screen.debug();
    });
});
