import { Fragment } from "react";

import DetailCard from "./partials/DetailCard";
import ItemContainer from "./shared/ItemContainer";
import Step from "./shared/Step";
import StepContainer from "./shared/StepContainer";

import { css, styled } from "@/root/stitches.config";
import { generateMetadata } from "@/utils/helper";
import withNavbarMobile from "@/hooks/hoc/withNavbarMobile";

import { Text } from "@/components/text";
import Item from "./shared/Item";

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

const steps = [{ id: 1, label: "Information" }];

function flatAndGroupObjectsBy(array, identifier) {
    return array.reduce((result, obj) => {
        const key = obj[identifier];

        if (!result[key]) {
            result[key] = { item: null, count: 0 };
        }

        result[key].item = obj;
        result[key].count += 1;
        return result;
    }, {});
}

function CheckoutPage({ data, links: { redirectToPaymentUrl }, meta }) {
    const tickets = Object.entries(
        flatAndGroupObjectsBy(data.tickets, "price")
    );

    const registrations = Object.entries(
        flatAndGroupObjectsBy(data.registrations, "price")
    );

    return (
        <>
            {generateMetadata(meta.head)}
            <Container>
                <div
                    className={css({
                        display: "grid",
                        gridTemplateColumns: "repeat(12, 1fr)",
                        gap: "3rem",
                        rowGap: "2rem",
                        width: "100%",
                        height: "max-content",
                        "@mobile": { gridTemplateColumns: "1fr" },
                    }).toString()}
                >
                    <section
                        className={css({
                            gridColumn: "1 / 9",
                            "@tablet": { gridColumn: "1 / -1 " },
                            "@mobile": { gridColumn: "1 / -1" },
                        }).toString()}
                    >
                        <StepContainer>
                            {steps.map((step) => (
                                <Step key={step.id} isActive={step.id === 1}>
                                    <span>{step.id}</span>
                                    <Text>{step.label}</Text>
                                </Step>
                            ))}
                        </StepContainer>
                        <ItemContainer>
                            {tickets.map(([_, data]) => (
                                <Item
                                    key={data.item.id}
                                    data={data}
                                    type={data.item.activity.type}
                                />
                            ))}
                            {registrations.map(([_, data]) => (
                                <Item
                                    key={data.item.id}
                                    data={data}
                                    type={data.item.competition.type}
                                />
                            ))}
                        </ItemContainer>
                    </section>
                    <section
                        className={css({
                            gridColumn: "9 / -1",
                            "@tablet": { gridColumn: "1 / -1" },
                            "@mobile": { gridColumn: "1 / -1" },
                        }).toString()}
                    >
                        <DetailCard
                            totalPrice={data.total_price}
                            redirectToPaymentUrl={redirectToPaymentUrl}
                        />
                    </section>
                </div>
            </Container>
        </>
    );
}

export default withNavbarMobile(CheckoutPage);
