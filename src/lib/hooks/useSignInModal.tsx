import { create } from "zustand";

type State = {
    visible: boolean;
};

type Action = {
    showSignInModal: () => void;
    hideSignInModal: () => void;
};

export const useSignInModal = create<State & Action>(
    (set) => ({
        visible: false,
        showSignInModal: () =>
            set((state) => ({ visible: true })),
        hideSignInModal: () =>
            set((state) => ({ visible: false })),
    }),
);
