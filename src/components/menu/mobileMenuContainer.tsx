"use client";
import {
    AnimatePresence,
    Variants,
    m,
} from "framer-motion";
import {
    useRef,
    Dispatch,
    SetStateAction,
    useState,
} from "react";
import {
    Avatar,
    Box,
    Button,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import { signOut } from "next-auth/react";
import Social from "../shared/social";
import SwitchTheme from "../shared/switchTheme";
import ToggleCart from "../cart/toggleCart";
import { MAIN_MENU_LINKS } from "@/lib/nav/mainMenu";
import { USER_MENU_LINKS } from "@/lib/nav/userMenu";
import { useSignInModal } from "@/lib/hooks/use-sign-in-modal";

export default function MobileMenuContainer({
    toggle,
    open,
}: {
    toggle: Dispatch<SetStateAction<boolean>>;
    open: boolean;
}) {
    const { data: session, status } = useSession();
    const { email, image, name } = session?.user || {};
    const ref = useRef<HTMLDivElement>(null);
    const { visible, hideSignInModal, showSignInModal } =
        useSignInModal((state) => ({
            visible: state.visible,
            hideSignInModal: state.hideSignInModal,
            showSignInModal: state.showSignInModal,
        }));
    const [anchorElUser, setAnchorElUser] =
        useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (
        event: React.MouseEvent<HTMLElement>,
    ) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const variants: Variants = {
        open: {
            transform: "translateX(0%)",
            opacity: 1,
            transition: {
                ease: [0.38, 0.65, 0.53, 0.56],
                duration: 0.4,
                when: "beforeChildren",
            },
        },
        closed: {
            transform: "translateX(100%)",
            opacity: 1,
            transition: {
                ease: [0.38, 0.65, 0.53, 0.56],
                duration: 0.3,
            },
        },
    };

    return (
        <AnimatePresence>
            {open ? (
                <m.div
                    ref={ref}
                    id="nav-container"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={variants}
                    className="flex flex-col gap-8  overflow-hidden text-surface-900 dark:text-surface-50"
                >
                    {/* <MobileNav
                className={`mt-12 flex flex-col place-self-start ${
                    menuOpen ? "" : ""
                }`}
            ></MobileNav> */}
                    <m.div className="mt-20 flex w-full flex-col items-center gap-8 place-self-start px-4">
                        <m.div>
                            <Link href="/">
                                <div className="flex place-items-center gap-x-6">
                                    EAlien
                                </div>
                            </Link>
                        </m.div>
                        <Box className="flex items-center">
                            {MAIN_MENU_LINKS.map((page) => (
                                <Link
                                    key={`main-menu-${page.title}`}
                                    href={page.url || "#"}
                                >
                                    {page.title}
                                </Link>
                            ))}
                        </Box>
                        {/* <Contacts className="flex-col" /> */}
                        <ToggleCart
                            toggleMobileMenu={toggle}
                        />
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <button
                                    onClick={
                                        handleOpenUserMenu
                                    }
                                >
                                    <Avatar
                                        alt={name || "User"}
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
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
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
                                            onClick={() => {
                                                handleCloseUserMenu();
                                                showSignInModal();
                                            }}
                                        >
                                            Sign In
                                            <LoginIcon className="h-6 w-6" />
                                        </Button>
                                    </MenuItem>
                                )}
                            </Menu>
                        </Box>
                        <Social />
                    </m.div>
                    <m.div
                        id="theme-toggle "
                        variants={{
                            open: {
                                transform: "translateY(0%)",
                                opacity: 1,
                                transition: {
                                    ease: "easeOut",
                                    duration: 0.6,
                                    when: "beforeChildren",
                                },
                            },
                            closed: {
                                transform:
                                    "translateY(200%)",
                                opacity: 0,
                                transition: {
                                    ease: "easeOut",
                                    duration: 0.6,
                                    when: "afterChildren",
                                },
                            },
                        }}
                        className="w-min place-self-center"
                    >
                        <SwitchTheme />
                    </m.div>
                </m.div>
            ) : null}
        </AnimatePresence>
    );
}
