import { MenuItem } from "../types/navMenu";

export const MAIN_MENU_LINKS: readonly MenuItem[] = [
    {
        title: "Catalogue",
        url: "/catalogue",
        submenu: {
            title: "Categories",
            items: [
                {
                    title: "Guitars",
                    url: "/catalogue/?category=guitars",
                },
                {
                    title: "Pianos",
                    url: "/catalogue/?category=pianos",
                },
                {
                    title: "Violins",
                    url: "/catalogue/?category=violins",
                },
            ],
        },
    },
];
