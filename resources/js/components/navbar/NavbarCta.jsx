import { styled } from "@/root/stitches.config";

import useAuth from "@/hooks/useAuth";
import useNavbarLinks from "@/hooks/useNavbarLinks";

import { Button } from "@/components/button";
import { UserCard, UserCardAvatar, UserCardName } from "./UserCard";

import { ReactComponent as LogoutIcon } from "@/assets/icons/logout.svg";

const LogoutButton = styled("button", {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "1.75rem",
    width: "1.75rem",
    border: "none",
    borderRadius: "50%",
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

export default function NavbarCta({ theme }) {
    const { auth, isAuthenticated, revokeAuth } = useAuth();
    const { authUrl } = useNavbarLinks();

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
                        <LogoutIcon className />
                    </LogoutButton>
                </UserCard>
            ) : (
                <Button color={theme} as="a" href={authUrl.attempt}>
                    Login / Register
                </Button>
            )}
        </>
    );
}
