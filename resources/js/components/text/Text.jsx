import { styled } from "@/root/stitches.config";

const BaseText = styled("p", {
    display: "block",
    letterSpacing: 2,
    lineHeight: 1.1,
    color: "$white",
    fontFamily: "$main",
    "@desktop": { fontSize: "$normal-desktop" },
    "@laptop": { fontSize: "$normal-laptop" },
    "@tablet": { fontSize: "$normal-tablet" },
    "@mobile": { fontSize: "$normal-mobile" },
});

export default function Text({ children, ...props }) {
    return <BaseText {...props}>{children}</BaseText>;
}
