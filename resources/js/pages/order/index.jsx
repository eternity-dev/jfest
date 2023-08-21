import { Link } from "@inertiajs/react";
import { css, styled } from "@/root/stitches.config";
import { generateMetadata } from "@/utils/helper";

import TicketCard from "./partials/TicketCard";

import { Button } from "@/components/button";
import { Text } from "@/components/text";
import { Title } from "@/components/title";

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

export default function OrderPage({
    data,
    links: { checkoutUrl, orderTicketUrl },
    meta,
}) {
    if (
        !data ||
        (data.tickets.length === 0 && data.registrations.length === 0)
    ) {
        return (
            <>
                {generateMetadata(meta.head)}
                <div
                    className={css({
                        display: "grid",
                        placeContent: "center",
                        height: "100vh",
                        width: "100%",
                        backgroundColor: "$dark",
                        textAlign: "center",
                        gap: "1rem",
                    }).toString()}
                >
                    <Title order={4}>Nothing Here</Title>
                    <Text css={{ color: "rgba(255, 255, 255, 0.5)" }}>
                        You don&quot;t have any orders yet. Lets make an order
                        now!
                    </Text>
                    <Link
                        href={orderTicketUrl}
                        style={{ textDecoration: "none" }}
                    >
                        <Button
                            color="light"
                            css={{ margin: "0 auto", marginTop: "1rem" }}
                        >
                            Buy Tickets Now
                        </Button>
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            {generateMetadata(meta.head)}
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
        </>
    );
}
