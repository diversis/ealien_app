"use client";
import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSession } from "next-auth/react";
import {
    Avatar,
    Box,
    Button,
    Container,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";

import MobileMenu from "./MobileMenu";
import { OPACITY_VARIANTS } from "@/lib/constants/variants";
import useWindowSize from "@/lib/hooks/use-window-size";
import SwitchTheme from "../shared/SwitchTheme";
import ScrollTop from "./ScrollTop";

import Cart from "../cart/Cart";
import { MAIN_MENU_LINKS } from "@/lib/nav/mainMenu";
import { USER_MENU_LINKS } from "@/lib/nav/userMenu";
import SignInModal from "../modals/SignInModal";
import { useSignInModal } from "@/lib/hooks/use-sign-in-modal";
import { MenuContext } from "@/lib/nav/menuContext";
import ToggleCart from "../cart/ToggleCart";
import useScrolled from "@/lib/hooks/use-scrolled";

const Header = () => {
    const { data: session, status } = useSession();
    const { email, image, name } = session?.user || {};

    const [anchorElUser, setAnchorElUser] =
        useState<null | HTMLElement>(null);
    const { isMobile, isDesktop } = useWindowSize();

    const { visible, hideSignInModal, showSignInModal } =
        useSignInModal((state) => ({
            visible: state.visible,
            hideSignInModal: state.hideSignInModal,
            showSignInModal: state.showSignInModal,
        }));

    const handleOpenUserMenu = (
        event: React.MouseEvent<HTMLElement>,
    ) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const scrolled = useScrolled(300);
    return (
        <header>
            <AnimatePresence mode="sync">
                {isMobile ? (
                    <m.div
                        variants={OPACITY_VARIANTS}
                        key="menu"
                        className="fixed right-0 top-0 z-[2000] grid w-0 grid-cols-1 grid-rows-[0fr] place-items-center "
                    >
                        <MenuContext.Provider
                            value={{
                                handleOpenUserMenu,
                                handleCloseUserMenu,
                            }}
                        >
                            <MobileMenu />
                        </MenuContext.Provider>
                    </m.div>
                ) : (
                    <m.div
                        variants={OPACITY_VARIANTS}
                        key="menu"
                        className={`${
                            scrolled
                                ? "bg-surface-50/60 after:opacity-100 dark:bg-surface-900/60"
                                : "bg-transparent after:opacity-0"
                        } fixed left-0 top-0 z-30 flex !h-24  w-screen items-center backdrop-blur-[8px] transition-colors duration-300 after:absolute after:inset-0  after:shadow-md after:shadow-surface-500/50 after:transition-opacity after:duration-500 `}
                    >
                        <Container maxWidth="xl">
                            <Toolbar
                                disableGutters
                                className="gap-x-4"
                            >
                                <m.div>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component={Link}
                                        href="/"
                                    >
                                        EAlien
                                    </Typography>
                                </m.div>
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        ml: "3rem",
                                        display: "flex",
                                        columnGap: "8px",
                                    }}
                                >
                                    {MAIN_MENU_LINKS.map(
                                        (page) => (
                                            <Link
                                                key={`main-menu-${page.title}`}
                                                href={
                                                    page.url ||
                                                    "#"
                                                }
                                            >
                                                {page.title}
                                            </Link>
                                        ),
                                    )}
                                </Box>

                                {/* <Contacts /> */}
                                <div className="flex flex-row gap-4">
                                    <ToggleCart />

                                    <SwitchTheme />
                                </div>
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Open settings">
                                        <button
                                            onClick={
                                                handleOpenUserMenu
                                            }
                                        >
                                            <Avatar
                                                alt={
                                                    name ||
                                                    "User"
                                                }
                                                src={
                                                    image ||
                                                    "/favicon.png"
                                                }
                                            />
                                        </button>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: "45px" }}
                                        id="menu-appbar"
                                        anchorEl={
                                            anchorElUser
                                        }
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal:
                                                "right",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal:
                                                "right",
                                        }}
                                        open={Boolean(
                                            anchorElUser,
                                        )}
                                        onClose={
                                            handleCloseUserMenu
                                        }
                                    >
                                        {USER_MENU_LINKS.map(
                                            (setting) => {
                                                if (
                                                    setting.loginRequired &&
                                                    !session
                                                )
                                                    return null;
                                                return (
                                                    <MenuItem
                                                        key={`user-menu-${setting.title}`}
                                                        className="!p-0"
                                                    >
                                                        <Link
                                                            href={
                                                                setting.url ||
                                                                "#"
                                                            }
                                                            className="w-full"
                                                        >
                                                            <Typography
                                                                textAlign="center"
                                                                className="px-2 py-1"
                                                            >
                                                                {
                                                                    setting.title
                                                                }
                                                            </Typography>
                                                        </Link>
                                                    </MenuItem>
                                                );
                                            },
                                        )}
                                        {!!email ? (
                                            <MenuItem
                                                key={`user-menu-logout`}
                                                className="!p-0"
                                            >
                                                <Button
                                                    variant="text"
                                                    onClick={() =>
                                                        signOut()
                                                    }
                                                    className="w-full"
                                                >
                                                    Logout
                                                    <LogoutIcon className="h-6 w-6" />
                                                </Button>
                                            </MenuItem>
                                        ) : (
                                            <MenuItem
                                                key={`user-menu-login`}
                                            >
                                                <Button
                                                    variant="text"
                                                    onClick={
                                                        showSignInModal
                                                    }
                                                >
                                                    Sign In
                                                    <LoginIcon className="h-6 w-6" />
                                                </Button>
                                            </MenuItem>
                                        )}
                                    </Menu>
                                </Box>
                            </Toolbar>
                        </Container>
                    </m.div>
                )}
            </AnimatePresence>
            <ScrollTop trigger={scrolled}>
                <Fab
                    size="small"
                    aria-label="scroll back to top"
                >
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
            {!session || !email ? (
                <SignInModal
                    open={visible}
                    handleClose={hideSignInModal}
                ></SignInModal>
            ) : null}
            <Cart />
        </header>
    );
};

export default Header;
