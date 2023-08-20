import { styled } from "@/root/stitches.config";
import { ReactComponent as DividerIcon } from "@/assets/icons/divider.svg";

const BaseDivider = styled(DividerIcon, {
    display: "block",
    width: "fit-content",
    height: 10,
    objectFit: "cover",
    objectPosition: "center",
});

export default function Divider({ ...props }) {
    return <BaseDivider {...props} />;
}
