import { styled } from "@/root/stitches.config";

const BaseTitle = styled("span", {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    fontFamily: "$title",
    fontWeight: 700,
    letterSpacing: 7.5,
    variants: {
        color: {
            dark: { color: "$dark" },
            light: { color: "$white" },
            tertiary: { color: "$tertiary" },
        },
        order: [
            {
                "@desktop": { fontSize: "$title-0-desktop" },
                "@laptop": { fontSize: "$title-0-laptop", letterSpacing: 6 },
                "@tablet": { fontSize: "$title-0-tablet", letterSpacing: 5.5 },
                "@mobile": { fontSize: "$title-0-mobile", letterSpacing: 5 },
            },
            {
                "@desktop": { fontSize: "$title-1-desktop" },
                "@laptop": { fontSize: "$title-1-laptop", letterSpacing: 5 },
                "@tablet": { fontSize: "$title-1-tablet", letterSpacing: 4.5 },
                "@mobile": { fontSize: "$title-1-mobile", letterSpacing: 4 },
            },
            {
                "@desktop": { fontSize: "$title-2-desktop" },
                "@laptop": { fontSize: "$title-2-laptop", letterSpacing: 4 },
                "@tablet": { fontSize: "$title-2-tablet", letterSpacing: 3.5 },
                "@mobile": { fontSize: "$title-2-mobile", letterSpacing: 3 },
            },
            {
                "@desktop": { fontSize: "$title-3-desktop" },
                "@laptop": { fontSize: "$title-3-laptop", letterSpacing: 4 },
                "@tablet": { fontSize: "$title-3-tablet", letterSpacing: 3.5 },
                "@mobile": { fontSize: "$title-3-mobile", letterSpacing: 3 },
            },
            {
                "@desktop": { fontSize: "$title-4-desktop" },
                "@laptop": { fontSize: "$title-4-laptop", letterSpacing: 4 },
                "@tablet": { fontSize: "$title-4-tablet", letterSpacing: 3.5 },
                "@mobile": { fontSize: "$title-4-mobile", letterSpacing: 3 },
            },
            {
                "@desktop": { fontSize: "$title-5-desktop" },
                "@laptop": { fontSize: "$title-5-laptop", letterSpacing: 4 },
                "@tablet": { fontSize: "$title-5-tablet", letterSpacing: 3.5 },
                "@mobile": { fontSize: "$title-5-mobile", letterSpacing: 3 },
            },
        ],
    },
    defaultVariants: { color: "light", order: 0 },
});

export default function Title({ children, ...props }) {
    return <BaseTitle {...props}>{children}</BaseTitle>;
}
