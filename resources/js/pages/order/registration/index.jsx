import { router, usePage } from "@inertiajs/react";
import { css, styled } from "@/root/stitches.config";
import { generateMetadata } from "@/utils/helper";

import useForm from "@/hooks/useForm";

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

const InputOuterWrapper = styled("div", {
    display: "grid",
    gridTemplateColumns: "auto",
    width: "100%",
    gap: "2rem",
    alignItems: "center",
    "@mobile": { gap: "1rem" },
});

const InputWrapper = styled("div", {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
});

export default function OrderRegistrationPage({
    data,
    links: { submitUrl },
    meta,
}) {
    const isActivity = data.type.toLowerCase() === "activity";

    const { errors } = usePage().props;
    const { inputs, handleChange } = useForm({
        email: "",
        name: "",
        phone: "",
        instagram: null,
        nickname: null,
    });

    function handleSubmitRegistrationsOrder(evt) {
        evt.preventDefault();
        router.post(submitUrl, inputs);
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
                    onSubmit={handleSubmitRegistrationsOrder}
                >
                    <InputOuterWrapper>
                        <InputWrapper>
                            <TextInput
                                name="email"
                                placeholder="Type your email here..."
                                value={inputs.email}
                                onChange={handleChange}
                                css={{ width: "100%" }}
                            />
                            {errors.email && (
                                <Text
                                    css={{
                                        fontSize: "1.25rem",
                                        color: "#ff3333",
                                    }}
                                >
                                    {errors.email}
                                </Text>
                            )}
                        </InputWrapper>
                    </InputOuterWrapper>
                    <InputOuterWrapper>
                        <InputWrapper>
                            <TextInput
                                name="name"
                                placeholder="Type your name here..."
                                value={inputs.name}
                                onChange={handleChange}
                                css={{ width: "100%" }}
                            />
                            {errors.name && (
                                <Text
                                    css={{
                                        fontSize: "1.25rem",
                                        color: "#ff3333",
                                    }}
                                >
                                    {errors.name}
                                </Text>
                            )}
                        </InputWrapper>
                    </InputOuterWrapper>
                    <InputOuterWrapper>
                        <InputWrapper>
                            <TextInput
                                name="phone"
                                placeholder="Type your phone number here..."
                                value={inputs.phone}
                                onChange={handleChange}
                                css={{ width: "100%" }}
                            />
                            {errors.phone && (
                                <Text
                                    css={{
                                        fontSize: "1.25rem",
                                        color: "#ff3333",
                                    }}
                                >
                                    {errors.phone}
                                </Text>
                            )}
                        </InputWrapper>
                    </InputOuterWrapper>
                    {data.use_instagram_field && (
                        <InputOuterWrapper
                            css={{
                                gridTemplateColumns: "1.5rem auto",
                                gap: "0.25rem",
                            }}
                        >
                            <Text>@</Text>
                            <InputWrapper>
                                <TextInput
                                    name="instagram"
                                    placeholder="Type your instagram username here..."
                                    value={inputs.instagram}
                                    onChange={handleChange}
                                    css={{ width: "100%" }}
                                />
                                {errors.instagram && (
                                    <Text
                                        css={{
                                            fontSize: "1.25rem",
                                            color: "#ff3333",
                                        }}
                                    >
                                        {errors.instagram}
                                    </Text>
                                )}
                            </InputWrapper>
                        </InputOuterWrapper>
                    )}
                    {data.use_nickname_field && (
                        <InputOuterWrapper>
                            <InputWrapper>
                                <TextInput
                                    name="nickname"
                                    placeholder="Type your nickname here..."
                                    value={inputs.nickname}
                                    onChange={handleChange}
                                    css={{ width: "100%" }}
                                />
                                {errors.nickname && (
                                    <Text
                                        css={{
                                            fontSize: "1.25rem",
                                            color: "#ff3333",
                                        }}
                                    >
                                        {errors.nickname}
                                    </Text>
                                )}
                            </InputWrapper>
                        </InputOuterWrapper>
                    )}
                    <Button
                        color="light"
                        css={{ marginTop: "2rem" }}
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
