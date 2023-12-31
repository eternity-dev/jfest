import { router, usePage } from "@inertiajs/react";
import { css, styled } from "@/root/stitches.config";
import { generateMetadata } from "@/utils/helper";

import useForm from "@/hooks/useForm";
import withNavbarMobile from "@/hooks/hoc/withNavbarMobile";

import HeaderSection from "./partials/HeaderSection";

import { Button } from "@/components/button";
import { TextInput } from "@/components/input";
import { Text } from "@/components/text";

const Container = styled("section", {
    display: "flex",
    flexDirection: "column",
    height: "max-content",
    padding: "0rem 5%",
    backgroundColor: "$dark",
    "@desktop": { paddingTop: "9.5rem" },
    "@laptop": { paddingTop: "9rem" },
    "@tablet": { paddingTop: "8.5rem" },
    "@mobile": { paddingTop: "8rem" },
});

const InputWrapper = styled("div", {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
});

function OrderTicketPage({ data, links: { submitUrl }, meta }) {
    const isActivity = data.type.toLowerCase() === "activity";

    const { inputs, handleChange } = useForm({ amount: 1 });
    const { errors } = usePage().props;

    function handleSubmitTicketsOrder(evt) {
        evt.preventDefault();
        router.post(submitUrl, { amount: +inputs.amount });
    }

    return (
        <>
            {generateMetadata(meta.head)}
            <Container css={{ gap: "2rem" }}>
                <HeaderSection data={data} isActivity={isActivity} />
                <form
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.25rem",
                        width: "50%",
                        margin: "0 auto",
                        "@mobile": { width: "80%" },
                    }).toString()}
                    onSubmit={handleSubmitTicketsOrder}
                >
                    <div
                        className={css({
                            display: "grid",
                            gridTemplateColumns: "auto 50px",
                            width: "100%",
                            gap: "2rem",
                            alignItems: "center",
                            "@mobile": { gap: "1rem" },
                        }).toString()}
                    >
                        <InputWrapper>
                            <TextInput
                                name="amount"
                                placeholder="Input tickets amount..."
                                value={inputs.amount}
                                onChange={handleChange}
                                css={{ width: "100%", textAlign: "center" }}
                            />
                            {errors.amount && (
                                <Text
                                    css={{
                                        fontSize: "1.25rem",
                                        color: "#ff3333",
                                    }}
                                >
                                    {errors.amount}
                                </Text>
                            )}
                        </InputWrapper>
                        <Text css={{ fontSize: "1.5rem" }}>Tickets</Text>
                    </div>
                    <Button
                        color="light"
                        css={{
                            marginTop: "2rem",
                        }}
                        type="submit"
                        fullWidth
                    >
                        Add To My Orders Lists
                    </Button>
                </form>
            </Container>
        </>
    );
}

export default withNavbarMobile(OrderTicketPage);
