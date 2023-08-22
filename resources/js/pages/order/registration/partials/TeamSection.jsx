import { FieldArray, Field } from "formik";

import { styled } from "@/root/stitches.config";

import { InputOuterWrapper, InputWrapper } from "../shared/InputWrapper";
import ErrorMessage from "../shared/ErrorMessage";

import { TextInput } from "@/components/input";
import { Text } from "@/components/text";

const Container = styled("div", {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    width: "100%",
});

export default function TeamSection({
    values,
    errors,
    useInstagramField,
    useNicknameField,
}) {
    return (
        <Container>
            <header style={{ paddingTop: "1rem" }}>
                <Text css={{ fontSize: "1.6rem" }}>Your Teams</Text>
            </header>
            <main
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                }}
            >
                <FieldArray name="members">
                    {() => (
                        <>
                            {values.teamMembers.length > 0 &&
                                values.teamMembers.map((_, idx) => (
                                    <div
                                        key={idx}
                                        style={{ marginBottom: "1rem" }}
                                    >
                                        <Field name={`teamMembers.${idx}.name`}>
                                            {({ field }) => (
                                                <InputOuterWrapper>
                                                    <InputWrapper>
                                                        <TextInput
                                                            placeholder="Type your name here..."
                                                            css={{
                                                                width: "100%",
                                                            }}
                                                            {...field}
                                                        />
                                                        {"teamMembers" in
                                                            errors &&
                                                            errors.teamMembers[
                                                                idx
                                                            ]?.name && (
                                                                <ErrorMessage
                                                                    msg={
                                                                        errors
                                                                            .teamMembers[
                                                                            idx
                                                                        ].name
                                                                    }
                                                                />
                                                            )}
                                                    </InputWrapper>
                                                </InputOuterWrapper>
                                            )}
                                        </Field>

                                        {useInstagramField && (
                                            <Field
                                                name={`teamMembers.${idx}.instagram`}
                                            >
                                                {({ field }) => (
                                                    <InputOuterWrapper
                                                        css={{
                                                            gridTemplateColumns:
                                                                "1.5rem auto",
                                                            gap: "0.25rem",
                                                        }}
                                                    >
                                                        <Text>@</Text>
                                                        <InputWrapper>
                                                            <TextInput
                                                                placeholder="Type your instagram username here..."
                                                                css={{
                                                                    width: "100%",
                                                                }}
                                                                {...field}
                                                            />
                                                            {"teamMembers" in
                                                                errors &&
                                                                errors
                                                                    .teamMembers[
                                                                    idx
                                                                ]
                                                                    ?.instagram && (
                                                                    <ErrorMessage
                                                                        msg={
                                                                            errors
                                                                                .teamMembers[
                                                                                idx
                                                                            ]
                                                                                .instagram
                                                                        }
                                                                    />
                                                                )}
                                                        </InputWrapper>
                                                    </InputOuterWrapper>
                                                )}
                                            </Field>
                                        )}
                                        {useNicknameField && (
                                            <Field
                                                name={`teamMembers.${idx}.nickname`}
                                            >
                                                {({ field }) => (
                                                    <InputOuterWrapper>
                                                        <InputWrapper>
                                                            <TextInput
                                                                placeholder="Type your nickname here..."
                                                                css={{
                                                                    width: "100%",
                                                                }}
                                                                {...field}
                                                            />
                                                            {"teamMembers" in
                                                                errors &&
                                                                errors
                                                                    .teamMembers[
                                                                    idx
                                                                ]?.nickname && (
                                                                    <ErrorMessage
                                                                        msg={
                                                                            errors
                                                                                .teamMembers[
                                                                                idx
                                                                            ]
                                                                                .nickname
                                                                        }
                                                                    />
                                                                )}
                                                        </InputWrapper>
                                                    </InputOuterWrapper>
                                                )}
                                            </Field>
                                        )}
                                    </div>
                                ))}
                        </>
                    )}
                </FieldArray>
            </main>
        </Container>
    );
}
