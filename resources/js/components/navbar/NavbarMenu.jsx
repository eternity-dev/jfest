import { useEffect, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";

import { styled } from "@/root/stitches.config";

import useAuth from "@/hooks/useAuth";
import useNavbar from "@/hooks/useNavbar";

const List = styled("ul", {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    listStyleType: "none",
    "@desktop": { gap: "3.5rem" },
    "@laptop": { gap: "3.25rem" },
    "@tablet": { gap: "3rem" },
    "@mobile": { gap: "2.5rem" },
});

const ListItem = styled("li", {
    display: "block",
    height: "fit-content",
    width: "fit-content",
    fontFamily: "dreadful",
    color: "$white",
    cursor: "unset",
    "@desktop": { fontSize: "$normal-desktop" },
    "@laptop": { fontSize: "$normal-laptop" },
    "@tablet": { fontSize: "$normal-tablet" },
    "@mobile": { fontSize: "$normal-mobile" },
});

const ListItemAnchor = styled("a", {
    color: "$white",
    textDecoration: "none",
    textDecorationColor: "transparent",
    "&:hover": {
        color: "$secondary",
        cursor: "pointer",
    },
    variants: {
        isActive: {
            true: {
                color: "$secondary",
            },
        },
    },
});

export default function NavbarMenu() {
    const { width } = useWindowSize();
    const { isAuthenticated } = useAuth();
    const {
        links: { navbarUrl },
    } = useNavbar();
    const [currentUrl, setCurrentUrl] = useState();

    useEffect(() => {
        setCurrentUrl(window.location.href.replace(/\/$/, ""));
    }, [window.location.href]);

    if (width <= 500) {
        return null;
    }

    return (
        <List>
            <ListItem>|</ListItem>
            {navbarUrl.map((item, index) =>
                !item.requireAuthenticated ||
                (item.requireAuthenticated && isAuthenticated) ? (
                    <ListItem key={index}>
                        <ListItemAnchor
                            href={item.href}
                            isActive={currentUrl == item.href}
                        >
                            {item.label}
                        </ListItemAnchor>
                    </ListItem>
                ) : null
            )}
        </List>
    );
}
