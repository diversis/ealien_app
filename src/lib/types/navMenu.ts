import { ReactNode } from "react";

export type MenuItem = {
    title: string;
    url?: string;
    icon?: ReactNode;
    trigger?: ReactNode;
    content?: ReactNode;
    submenuTitle?: string;
    submenu?: { title: string; items: MenuItem[] };
    className?: string;
    loginRequired?: boolean
};
