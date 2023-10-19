import { MenuItem } from "../types/navMenu";

export const USER_MENU_LINKS: readonly MenuItem[] = [
    {
        title: "Profile",
        url: "/profile",
        loginRequired: true,
    },
];
