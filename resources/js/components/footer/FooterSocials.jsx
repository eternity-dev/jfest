import { css, styled } from "@/root/stitches.config";
import { Title } from "../title";

import { ReactComponent as FacebookIcon } from "@/assets/icons/facebook.svg";
import { ReactComponent as InstagramIcon } from "@/assets/icons/instagram.svg";
import { ReactComponent as TiktokIcon } from "@/assets/icons/tiktok.svg";

const socials = [
    { id: 1, label: "@jfest", href: "", Icon: InstagramIcon },
    { id: 2, label: "@jfest.id", href: "", Icon: FacebookIcon },
    { id: 3, label: "@jfest-by-stikom", href: "", Icon: TiktokIcon },
];

const SocialLink = styled("a", {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "1rem",
    color: "$white",
    fontFamily: "$main",
    fontSize: "1.3em",
    letterSpacing: 2,
    textDecoration: "none",
    textDecorationColor: "transparent",
    "&:hover": {
        textDecoration: "underline",
        textDecorationColor: "$white",
    },
    "& > svg": {
        width: "1.45rem",
    },
});

export default function FooterSocials() {
    return (
        <section
            className={css({
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gridColumn: "11 / -1",
                paddingTop: "5rem",
                gap: "1.5rem",
                zIndex: 2,
                "@tablet": { gridColumn: "7 / -1", paddingTop: "1.5rem" },
                "@mobile": { gridColumn: "1 / -1", paddingTop: "1.5rem" },
            }).toString()}
        >
            <Title order={2} css={{ fontSize: "1.25em" }}>
                Social Media
            </Title>
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                }).toString()}
            >
                {socials.map((social) => (
                    <SocialLink key={social.id} href={social.href}>
                        <social.Icon />
                        <span>{social.label}</span>
                    </SocialLink>
                ))}
            </div>
        </section>
    );
}
