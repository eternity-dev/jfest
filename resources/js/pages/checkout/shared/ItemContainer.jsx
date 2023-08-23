import { styled } from "@/root/stitches.config";

const Container = styled("div", {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    width: "100%",
    height: "max-content",
    paddingTop: "1.5rem",
});

export default function ItemContainer({ children }) {
    return <Container>{children}</Container>;
}
