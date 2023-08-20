import { useWindowSize } from "@uidotdev/usehooks";
import { styled } from "@/root/stitches.config";

import useNavbarLinks from "@/hooks/useNavbarLinks";

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
});

export default function NavbarMenu() {
    const { width } = useWindowSize();
    const { navbarUrl } = useNavbarLinks();

    if (width <= 769) {
        return null;
    }

    return (
        <List>
            <ListItem>|</ListItem>
            {navbarUrl.map((item, index) => (
                <ListItem key={index}>
                    <ListItemAnchor href={item.href}>
                        {item.label}
                    </ListItemAnchor>
                </ListItem>
            ))}
        </List>
    );
}