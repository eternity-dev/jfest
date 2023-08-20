import { styled } from "@/root/stitches.config";
import { Text } from "@/components/text";

export const UserCard = styled("div", {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "1rem",
});

export const UserCardName = styled(Text, {
    color: "$white",
});

export const UserCardAvatar = styled("span", {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "2.25rem",
    width: "2.25rem",
    border: "1.5px solid $tertiary",
    borderRadius: "50%",
    backgroundColor: "transparent",
    "& > img": {
        height: "85%",
        width: "85%",
        borderRadius: "50%",
        objectFit: "cover",
        objectPosition: "center",
    },
});
