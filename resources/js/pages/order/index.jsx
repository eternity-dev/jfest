import { css, styled } from "@/root/stitches.config";

import TicketCard from "./partials/TicketCard";

import { Button } from "@/components/button";
import { Title } from "@/components/title";
import { Link } from "@inertiajs/react";

const Container = styled("section", {
    display: "flex",
    flexDirection: "column",
    height: "max-content",
    padding: "2rem 5%",
    backgroundColor: "$dark",
    "@desktop": { paddingTop: "9.5rem" },
    "@laptop": { paddingTop: "9rem" },
    "@tablet": { paddingTop: "8.5rem" },
    "@mobile": { paddingTop: "8rem" },
});

export default function OrderPage({ data, links: { checkoutUrl } }) {
    return (
        <Container>
            <header
                className={css({
                    display: "block",
                    width: "100%",
                    paddingBottom: "2rem",
                    borderBottom: "1.5px solid rgba(255, 255, 255, 0.1)",
                    "@mobile": { paddingBottom: "1.5rem" },
                }).toString()}
            >
                <Title
                    css={{
                        fontSize: "2rem",
                        letterSpacing: 1.25,
                        "@mobile": { fontSize: "1.5rem" },
                    }}
                >
                    My Orders
                </Title>
            </header>
            <section
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                    width: "100%",
                    padding: "2rem 0rem",
                    "@mobile": {
                        gap: "1.25rem",
                        padding: "1.5rem 0rem",
                    },
                }).toString()}
            >
                {data.tickets.length > 0 &&
                    data.tickets.map((ticket) => (
                        <TicketCard key={ticket.id} data={ticket} />
                    ))}
            </section>
            <Link href={checkoutUrl} style={{ textDecoration: "none" }}>
                <Button color="light" fullWidth>
                    Checkout Now
                </Button>
            </Link>
        </Container>
    );
}
