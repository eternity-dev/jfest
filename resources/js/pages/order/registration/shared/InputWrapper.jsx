import { styled } from "@/root/stitches.config";

export const InputOuterWrapper = styled("div", {
    display: "grid",
    gridTemplateColumns: "auto",
    width: "100%",
    gap: "2rem",
    alignItems: "center",
    "@mobile": { gap: "1rem" },
});

export const InputWrapper = styled("div", {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
});
