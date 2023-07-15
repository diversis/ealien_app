"use client";
import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuIcon from "@mui/icons-material/Menu";
import { useSession } from "next-auth/react";

import useScrolled from "@/lib/hooks/use-scrolled";
import Social from "../shared/social";
import MobileMenu from "./mobileMenu";
import { OPACITY_VARIANTS } from "@/lib/constants";
import useWindowSize from "@/lib/hooks/use-window-size";
import SwitchTheme from "../shared/switchTheme";
import ScrollTop from "./scrollTop";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import Cart from "../cart/cart";
import Image from "next/image";

const pages = ["Catalogue", "Pricing", "Blog"];
const settings = [
    "Profile",
    "Account",
    "Dashboard",
    "Logout",
];

const Header = () => {
    const { data: session, status } = useSession();
    const { email, image, name } = session?.user || {};
    // const IsClient = useIsClient();
    const [anchorElNav, setAnchorElNav] =
        useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] =
        useState<null | HTMLElement>(null);
    const { isMobile, isDesktop } = useWindowSize();
    const [menuOpen, setMenuOpen] = useState(false);
    const scrolled = useScrolled(100);

    const handleOpenNavMenu = (
        event: React.MouseEvent<HTMLElement>,
    ) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (
        event: React.MouseEvent<HTMLElement>,
    ) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    // const trigger = useScrollTrigger({
    //     target: window ? window : undefined,
    //     threshold: 300,
    // });
    const MAppBar = m(AppBar);
    return (
        <header>
            <AnimatePresence mode="sync">
                {isMobile ? (
                    <m.div
                        variants={OPACITY_VARIANTS}
                        key="menu"
                        className="fixed right-0 top-0 z-[120] grid w-0 grid-cols-1 grid-rows-[0fr] place-items-center "
                    >
                        <MobileMenu />
                    </m.div>
                ) : (
                    <m.div
                        variants={OPACITY_VARIANTS}
                        key="menu"
                        className={`${
                            scrolled
                                ? "bg-surface-50/60 after:opacity-100 dark:bg-surface-900/60"
                                : "after:opacity-0"
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
                                        AALIEN
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
                                    {pages.map((page) => (
                                        <Link
                                            key={page}
                                            href={`/${page.toLowerCase()}`}
                                        >
                                            {page}
                                        </Link>
                                    ))}
                                </Box>

                                {/* <Contacts /> */}
                                <div className="flex flex-row gap-4">
                                    <Cart />

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
                                                    "/images/logo2.png"
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
                                        {settings.map(
                                            (setting) => (
                                                <Link
                                                    key={
                                                        setting
                                                    }
                                                    href={
                                                        "#"
                                                    }
                                                >
                                                    <Typography textAlign="center">
                                                        {
                                                            setting
                                                        }
                                                    </Typography>
                                                </Link>
                                            ),
                                        )}
                                    </Menu>
                                </Box>
                            </Toolbar>
                        </Container>
                    </m.div>
                )}
            </AnimatePresence>
            <ScrollTop>
                <Fab
                    size="small"
                    aria-label="scroll back to top"
                >
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </header>
    );
};

export default Header;
