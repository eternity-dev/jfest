import { styled } from "@/root/stitches.config";

const BaseTextInput = styled("input", {
    display: "block",
    fontFamily: "$main",
    fontSize: "1.5rem",
    padding: "1rem 0rem",
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "1.5px solid rgba(255, 255, 255, 0.2)",
    outline: "none",
    color: "$white",
    "&:placeholder": {
        color: "rgba(255, 255, 255, 0.5)",
    },
});

export default function TextInput({ ...props }) {
    return <BaseTextInput {...props} />;
}
