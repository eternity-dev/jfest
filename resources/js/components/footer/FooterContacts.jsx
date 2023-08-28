import { css, styled } from "@/root/stitches.config";
import { Title } from "@/components/title";

// import { ReactComponent as TelegramIcon } from "@/assets/icons/telegram.svg";
import { ReactComponent as WhatsappIcon } from "@/assets/icons/whatsapp.svg";

const contacts = [
    {
        id: 1,
        label: "Ananta (0895380006644)",
        href: "https://wa.me/895380006644?text=Hai%20kak%20Ananta%2C%20saya%20ingin%20bertanya.",
        Icon: WhatsappIcon,
    },
    {
        id: 2,
        label: "Gung Nickto (087761333399)",
        href: "https://wa.me/87761333399?text=Hai%20kak%20Nickto%2C%20saya%20ingin%20bertanya.",
        Icon: WhatsappIcon,
    },
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

export default function FooterContacts() {
    return (
        <section
            className={css({
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gridColumn: "8 / 11",
                paddingTop: "5rem",
                gap: "1.5rem",
                zIndex: 2,
                "@tablet": { gridColumn: "1 / 7", paddingTop: "1.5rem" },
                "@mobile": { gridColumn: "1 / -1", paddingTop: "1.5rem" },
            }).toString()}
        >
            <Title order={2} css={{ fontSize: "1.25em" }}>
                Contact Us
            </Title>
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                }).toString()}
            >
                {contacts.map((contact) => (
                    <SocialLink
                        key={contact.id}
                        href={contact.href}
                        target="_blank"
                    >
                        <contact.Icon />
                        <span>{contact.label}</span>
                    </SocialLink>
                ))}
            </div>
        </section>
    );
}
