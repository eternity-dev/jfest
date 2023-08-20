import { styled } from "@/root/stitches.config";
import { ReactComponent as JFestLogo } from "@/assets/logo.svg";

const Logo = styled(JFestLogo, {
    display: "block",
    objectFit: "cover",
    objectPosition: "center",
    width: 50,
    "@mobile": { width: 40 },
});

export default function NavbarLogo() {
    return <Logo />;
}
