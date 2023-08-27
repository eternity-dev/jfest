import { Link, usePage } from "@inertiajs/react";
import { styled } from "@/root/stitches.config";
import { useEffect } from "react";

import useAuth from "@/hooks/useAuth";
import useNavbar from "@/hooks/useNavbar";

const Container = styled("nav", {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "none",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
    backgroundColor: "$dark",
    zIndex: 99,
    variants: {
        isActive: {
            true: { display: "flex" },
        },
    },
});

const Menu = styled("div", {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
});

const MenuLink = styled(Link, {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    color: "$white",
    fontFamily: "$main",
    fontSize: "2rem",
    "&:hover": {
        color: "$secondary",
    },
    variants: {
        isActive: {
            true: { color: "$secondary" },
        },
    },
});

const CloseButton = styled("div", {
    position: "absolute",
    top: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0rem 1.5rem",
    letterSpacing: 0,
    lineHeight: 1,
    fontFamily: "$main",
    fontSize: "5rem",
    color: "$white",
});

export default function NavbarResponsive() {
    const {
        links: { navbarUrl },
        isMobileNavbarOpened,
        toggleIsMobileNavbarOpened,
    } = useNavbar();
    const { isAuthenticated } = useAuth();
    const { url } = usePage();

    useEffect(() => {
        if (isMobileNavbarOpened) toggleIsMobileNavbarOpened();
    }, [url]);

    return (
        <Container isActive={isMobileNavbarOpened}>
            <Menu>
                {navbarUrl.map((item, index) =>
                    !item.requireAuthenticated ||
                    (item.requireAuthenticated && isAuthenticated) ? (
                        <MenuLink
                            key={index}
                            href={item.href}
                            isActive={url == new URL(item.href).pathname}
                        >
                            {item.label}
                        </MenuLink>
                    ) : null
                )}
            </Menu>
            <CloseButton onClick={toggleIsMobileNavbarOpened}>
                &times;
            </CloseButton>
        </Container>
    );
}
