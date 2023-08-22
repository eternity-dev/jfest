import { useEffect, useState } from "react";
import { Formik, Form } from "formik";

import { css, styled } from "@/root/stitches.config";
import { generateMetadata } from "@/utils/helper";
import { router, usePage } from "@inertiajs/react";

import { InputOuterWrapper, InputWrapper } from "./shared/InputWrapper";
import ErrorMessage from "./shared/ErrorMessage";

import HeaderSection from "./partials/HeaderSection";
import TeamSection from "./partials/TeamSection";

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

function toObject(data) {
    const result = {};

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const keys = key.split(".");
            let current = result;

            keys.forEach((nestedKey, index) => {
                if (!current[nestedKey]) {
                    current[nestedKey] = {};
                }

                if (index === keys.length - 1) {
                    current[nestedKey] = data[key];
                }

                current = current[nestedKey];
            });
        }
    }

    return result;
}

export default function OrderRegistrationPage({
    data,
    links: { submitUrl },
    meta,
}) {
    const isActivity = data.type.toLowerCase() === "activity";

    const { errors: baseErrors } = usePage().props;
    const [errors, setErrors] = useState(baseErrors);

    const initialValues = {
        email: "",
        name: "",
        phone: "",
        instagram: null,
        nickname: null,
        teamName: null,
        teamMembers: new Array(data.min_participants).fill({
            name: "",
            instagram: null,
            nickname: null,
        }),
    };

    useEffect(() => {
        setErrors(toObject(baseErrors));
    }, [baseErrors]);

    function handleSubmitRegistrationsOrder(values) {
        return router.post(submitUrl, values);
    }

    return (
        <>
            {generateMetadata(meta.head)}
            <Container css={{ gap: "2rem" }}>
                <HeaderSection data={data} isActivity={isActivity} />
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmitRegistrationsOrder}
                >
                    {({ values, handleBlur, handleChange }) => {
                        return (
                            <Form
                                className={css({
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1.25rem",
                                    width: "50%",
                                    margin: "0 auto",
                                    "@mobile": { width: "80%" },
                                }).toString()}
                            >
                                <InputOuterWrapper>
                                    <InputWrapper>
                                        <TextInput
                                            name="email"
                                            placeholder="Type your email here..."
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            css={{ width: "100%" }}
                                        />
                                        {errors.email && (
                                            <ErrorMessage msg={errors.email} />
                                        )}
                                    </InputWrapper>
                                </InputOuterWrapper>
                                <InputOuterWrapper>
                                    <InputWrapper>
                                        <TextInput
                                            name="name"
                                            placeholder="Type your name here..."
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            css={{ width: "100%" }}
                                        />
                                        {errors.name && (
                                            <ErrorMessage msg={errors.name} />
                                        )}
                                    </InputWrapper>
                                </InputOuterWrapper>
                                <InputOuterWrapper>
                                    <InputWrapper>
                                        <TextInput
                                            name="phone"
                                            placeholder="Type your phone number here..."
                                            value={values.phone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            css={{ width: "100%" }}
                                        />
                                        {errors.phone && (
                                            <ErrorMessage msg={errors.phone} />
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
                                                value={values.instagram}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                css={{ width: "100%" }}
                                            />
                                            {errors.instagram && (
                                                <ErrorMessage
                                                    msg={errors.instagram}
                                                />
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
                                                value={values.nickname}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                css={{ width: "100%" }}
                                            />
                                            {errors.nickname && (
                                                <ErrorMessage
                                                    msg={errors.nickname}
                                                />
                                            )}
                                        </InputWrapper>
                                    </InputOuterWrapper>
                                )}
                                {data.use_multi_participant && (
                                    <InputOuterWrapper>
                                        <InputWrapper>
                                            <TextInput
                                                name="teamName"
                                                placeholder="Type your team name here..."
                                                value={values.teamName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                css={{ width: "100%" }}
                                            />
                                            {errors.teamName && (
                                                <ErrorMessage
                                                    msg={errors.teamName}
                                                />
                                            )}
                                        </InputWrapper>
                                    </InputOuterWrapper>
                                )}
                                {data.use_multi_participant && (
                                    <TeamSection
                                        errors={errors}
                                        values={values}
                                        maxParticipants={data.max_participants}
                                        useInstagramField={
                                            data.use_instagram_field
                                        }
                                        useNicknameField={
                                            data.use_nickname_field
                                        }
                                    />
                                )}
                                <Button
                                    color="light"
                                    css={{ marginTop: "2rem" }}
                                    type="submit"
                                    fullWidth
                                >
                                    Add To My Orders Lists
                                </Button>
                            </Form>
                        );
                    }}
                </Formik>
            </Container>
        </>
    );
}
