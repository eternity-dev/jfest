import { styled } from "@/root/stitches.config";

import useAuth from "@/hooks/useAuth";
import useNavbar from "@/hooks/useNavbar";

import { Button } from "@/components/button";
import { UserCard, UserCardAvatar, UserCardName } from "./UserCard";

import { ReactComponent as LogoutIcon } from "@/assets/icons/logout.svg";
import { ReactComponent as MenuIcon } from "@/assets/icons/menu.svg";
import { useWindowSize } from "@uidotdev/usehooks";

const LogoutButton = styled("button", {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "1.75rem",
    width: "1.75rem",
    border: "none",
    borderRadius: "0.5rem",
    backgroundColor: "transparent",
    outline: "none",
    transition: "all 0.3s ease-in-out",
    transitionProperty: "background-color",
    "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.25)",
    },
    "& > svg": {
        height: "70%",
        width: "70%",
        fill: "$white",
    },
});

const MenuButton = styled(LogoutButton, {});

export default function NavbarCta({ theme }) {
    const { width } = useWindowSize();
    const { auth, isAuthenticated, revokeAuth } = useAuth();
    const {
        links: { authUrl },
        toggleIsMobileNavbarOpened,
    } = useNavbar();

    function handleRevokeAuth(evt) {
        evt.preventDefault();
        revokeAuth(authUrl.revoke);
    }

    return (
        <>
            {isAuthenticated ? (
                <UserCard>
                    <UserCardName>{auth.name}</UserCardName>
                    <UserCardAvatar>
                        <img src={auth.avatar} alt={`${auth.email} avatar`} />
                    </UserCardAvatar>
                    <LogoutButton onClick={handleRevokeAuth}>
                        <LogoutIcon />
                    </LogoutButton>
                    {width < 500 && (
                        <MenuButton onClick={toggleIsMobileNavbarOpened}>
                            <MenuIcon />
                        </MenuButton>
                    )}
                </UserCard>
            ) : (
                <Button color={theme} as="a" href={authUrl.attempt}>
                    Login / Register
                </Button>
            )}
        </>
    );
}
