import { styled } from "@/root/stitches.config";

const BaseGrid = styled("div", {
    position: "relative",
    display: "grid",
    gap: "2rem",
    variants: {
        cols: {
            1: { gridTemplateColumns: "repeat(1, 1fr)" },
            2: { gridTemplateColumns: "repeat(2, 1fr)" },
            3: {
                gridTemplateColumns: "repeat(3, 1fr)",
                "@tablet": { gridTemplateColumns: "repeat(2, 1fr)" },
                "@mobile": { gridTemplateColumns: "repeat(1, 1fr)" },
            },
        },
    },
    defaultVariants: { cols: 1 },
});

export default function Grid({ children, ...props }) {
    return <BaseGrid {...props}>{children}</BaseGrid>;
}
