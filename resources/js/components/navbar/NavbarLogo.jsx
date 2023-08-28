import { styled } from "@/root/stitches.config";
import { ReactComponent as JFestLogo } from "@/assets/logo.svg";
import { Link } from "@inertiajs/react";

import useNavbar from "@/hooks/useNavbar";

const Logo = styled(JFestLogo, {
    display: "block",
    objectFit: "cover",
    objectPosition: "center",
    width: 50,
    "@mobile": { width: 40 },
});

export default function NavbarLogo() {
    const {
        links: { homeUrl },
    } = useNavbar();

    return (
        <Link href={homeUrl}>
            <Logo />
        </Link>
    );
}
