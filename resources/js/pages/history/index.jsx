import { css, styled } from "@/root/stitches.config";
import { generateMetadata } from "@/utils/helper";

import withNavbarMobile from "@/hooks/hoc/withNavbarMobile";

import { Text } from "@/components/text";
import { Title } from "@/components/title";

import Item from "./partials/Item";
import ItemContainer from "./partials/ItemContainer";

const Container = styled("section", {
    position: "relative",
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

function HistoryPage({ data, meta }) {
    return (
        <>
            {generateMetadata(meta.head)}
            <Container>
                <header
                    className={css({
                        display: "block",
                        width: "100%",
                        paddingBottom: "2rem",
                        borderBottom: "1.5px solid rgba(255, 255, 255, 0.05)",
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
                        History
                    </Title>
                </header>
                <section
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                    }).toString()}
                >
                    {data.map((order) => (
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                                padding: "2rem 0rem",
                                borderBottom:
                                    "1.5px solid rgba(255, 255, 255, 0.05)",
                                "@mobile": {
                                    gap: "1.25rem",
                                    padding: "1.5rem 0rem",
                                },
                            }).toString()}
                        >
                            <Text>Order: {order.reference}</Text>
                            <ItemContainer>
                                {order.tickets.map((ticket) => (
                                    <Item
                                        key={ticket.id}
                                        data={ticket}
                                        type={ticket.activity.type}
                                    />
                                ))}
                                {order.registrations.map((registration) => (
                                    <Item
                                        key={registration.id}
                                        data={registration}
                                        type={registration.competition.type}
                                    />
                                ))}
                            </ItemContainer>
                        </div>
                    ))}
                </section>
            </Container>
        </>
    );
}

export default withNavbarMobile(HistoryPage);
