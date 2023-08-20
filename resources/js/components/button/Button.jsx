import { css, styled } from "@/root/stitches.config";

import { ReactComponent as DarkEdge } from "@/assets/buttons/dark.svg";
import { ReactComponent as LightEdge } from "@/assets/buttons/light.svg";

const BaseButton = styled("button", {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "fit-content",
    minWidth: 250,
    outline: "none",
    border: "none",
    backgroundColor: "transparent",
    fontFamily: "$main",
    letterSpacing: 2,
    cursor: "pointer",
    overflow: "hidden",
    textDecoration: "none",
    textDecorationColor: "transparent",
    "&:hover": {
        color: "$secondary",
    },
    "& > span": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        height: "inherit",
        width: "80%",
        color: "$white",
        backgroundColor: "$dark",
        transition: "all .2s ease-in",
        transitionProperty: "color",
        zIndex: 1,
    },
    "& > span:hover": { color: "$secondary" },
    "@desktop": {
        height: "$button-desktop-height",
        fontSize: "$normal-desktop",
    },
    "@laptop": { height: "$button-laptop-height", fontSize: "$normal-laptop" },
    "@tablet": { height: "$button-tablet-height", fontSize: "$normal-tablet" },
    "@mobile": { height: "$button-mobile-height", fontSize: "$normal-mobile" },
    variants: {
        color: {
            dark: { color: "$white" },
            light: {
                color: "$dark",
                "& > span": { color: "$dark", backgroundColor: "$white" },
            },
        },
        fullWidth: {
            true: { width: "100%" },
        },
    },
    defaultVariants: { color: "dark" },
});

const leftEdgeClassName = css({
    position: "absolute",
    left: 0,
    height: "110%",
    "@tablet": { transform: "translateX(-5%)" },
    "@mobile": { transform: "translateX(-10%)" },
}).toString();

const rightEdgeClassName = css({
    position: "absolute",
    right: 0,
    height: "110%",
    "@tablet": { transform: "translateX(5%)" },
    "@mobile": { transform: "translateX(10%)" },
}).toString();

function WithEdge({ color, children }) {
    const Edge = color.toLowerCase() === "dark" ? DarkEdge : LightEdge;

    return (
        <>
            <Edge className={leftEdgeClassName} />
            {children}
            <Edge className={rightEdgeClassName} />
        </>
    );
}

export default function Button({ color = "dark", children, ...props }) {
    return (
        <BaseButton color={color} {...props} size={{ "@mobile": "mobile" }}>
            <WithEdge color={color}>
                <span>{children}</span>
            </WithEdge>
        </BaseButton>
    );
}
