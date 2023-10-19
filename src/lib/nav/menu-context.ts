import { createContext } from "react";

export interface MenuContextProps {
    handleOpenUserMenu?: (
        event: React.MouseEvent<HTMLElement>,
    ) => void;
    handleCloseUserMenu?: (
        event: React.MouseEvent<HTMLElement>,
    ) => void;

}

export const MenuContext = createContext<MenuContextProps>({})