"use client";
import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";
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
import useWindowSize from "@/lib/hooks/useWindowSize";
import SwitchTheme from "../shared/SwitchTheme";
import ScrollTop from "./ScrollTop";

import Cart from "../cart/Cart";
import { MAIN_MENU_LINKS } from "@/lib/nav/main-menu";
import { USER_MENU_LINKS } from "@/lib/nav/user-menu";
import SignInModal from "../modals/SignInModal";
import { useSignInModal } from "@/lib/hooks/useSignInModal";
import { MenuContext } from "@/lib/nav/menu-context";
import ToggleCart from "../cart/ToggleCart";
import useScrolled from "@/lib/hooks/useScrolled";
import { useSession } from "@/lib/utils/useSession";

const Header = () => {
    const { data: session, status } = useSession()();
    const { email, image, name } = session?.user || {};
    console.log(name);
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
        <header data-testid="header">
            <AnimatePresence mode="sync">
                {isMobile ? (
                    <m.div
                        data-testid="menu-mobile-portal"
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
                        data-testid="menu-desktop-wrapper"
                        variants={OPACITY_VARIANTS}
                        key="menu"
                        className={`${
                            scrolled
                                ? "bg-surface-50/60 after:opacity-100 dark:bg-surface-900/60"
                                : "bg-transparent after:opacity-0"
                        } fixed left-0 top-0 z-30 flex !h-24  w-screen items-center backdrop-blur-[8px] transition-colors duration-300 after:absolute after:inset-0  after:shadow-md after:shadow-surface-500/50 after:transition-opacity after:duration-500 `}
                    >
                        <Container
                            maxWidth="xl"
                            data-testid="menu-desktop-container"
                        >
                            <Toolbar
                                disableGutters
                                className="gap-x-4"
                                data-testid="menu-desktop-toolbar"
                            >
                                <m.div data-testid="menu-desktop-logo-wrapper">
                                    <Typography
                                        data-testid="menu-desktop-logo-h6"
                                        variant="h6"
                                        noWrap
                                        component={Link}
                                        href="/"
                                    >
                                        EAlien
                                    </Typography>
                                </m.div>
                                <Box
                                    data-testid="menu-desktop-links-box"
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
                                                data-testid={`menu-desktop-links-${page.title}`}
                                                key={`main-menu-${page.title}`}
                                                href={
                                                    page.url ||
                                                    "#"
                                                }
                                                className="link"
                                            >
                                                {page.title}
                                            </Link>
                                        ),
                                    )}
                                </Box>

                                {/* <Contacts /> */}
                                <div
                                    data-testid="menu-desktop-buttons-container"
                                    className="flex flex-row gap-4"
                                >
                                    <ToggleCart />

                                    <SwitchTheme />
                                </div>
                                <Box
                                    data-testid="menu-desktop-user-box"
                                    sx={{ flexGrow: 0 }}
                                >
                                    <Tooltip
                                        data-testid="menu-desktop-user-tooltip"
                                        title="Open settings"
                                    >
                                        <button
                                            data-testid="menu-desktop-user-button"
                                            onClick={
                                                handleOpenUserMenu
                                            }
                                        >
                                            <Avatar
                                                data-testid="menu-desktop-user-avatar"
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
                                        data-testid="menu-desktop-user-menu"
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
                                                        data-testid={`menu-desktop-user-menuitem-${setting.title}`}
                                                        key={`user-menu-${setting.title}`}
                                                        className="!p-0"
                                                    >
                                                        <Link
                                                            data-testid={`menu-desktop-user-menuitem-link-${setting.title}`}
                                                            href={
                                                                setting.url ||
                                                                "#"
                                                            }
                                                            className="w-full"
                                                        >
                                                            <Typography
                                                                data-testid={`menu-desktop-user-menuitem-link-title-${setting.title}`}
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
                                        {session &&
                                        status ===
                                            "authenticated" &&
                                        !!email ? (
                                            <MenuItem
                                                data-testid="menu-desktop-user-menuitem-logout"
                                                key={`user-menu-logout`}
                                                className="!p-0"
                                            >
                                                <Button
                                                    data-testid="menu-desktop-user-menuitem-logout-button"
                                                    variant="text"
                                                    onClick={() =>
                                                        signOut()
                                                    }
                                                    className="w-full"
                                                >
                                                    Logout
                                                    <LogoutIcon
                                                        data-testid="menu-desktop-user-menuitem-logout-icon"
                                                        className="h-6 w-6"
                                                    />
                                                </Button>
                                            </MenuItem>
                                        ) : (
                                            <MenuItem
                                                data-testid="menu-desktop-user-menuitem-login"
                                                key={`user-menu-login`}
                                            >
                                                <Button
                                                    data-testid="menu-desktop-user-menuitem-login-button"
                                                    variant="text"
                                                    onClick={
                                                        showSignInModal
                                                    }
                                                >
                                                    Sign In
                                                    <LoginIcon
                                                        data-testid="menu-desktop-user-menuitem-login-icon"
                                                        className="h-6 w-6"
                                                    />
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
            <ScrollTop
                data-testid="menu-scroll-top"
                trigger={scrolled}
                className="fixed bottom-16 right-4 z-[1000] lg:bottom-4"
            >
                <Fab
                    data-testid="menu-scroll-top-fab"
                    size="small"
                    aria-label="scroll back to top"
                >
                    <KeyboardArrowUpIcon data-testid="menu-scroll-top-icon" />
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
