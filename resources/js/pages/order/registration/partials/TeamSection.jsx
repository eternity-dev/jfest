import { FieldArray, Field } from "formik";

import { css, styled } from "@/root/stitches.config";

import { InputOuterWrapper, InputWrapper } from "../shared/InputWrapper";
import ErrorMessage from "../shared/ErrorMessage";

import { Button } from "@/components/button";
import { TextInput } from "@/components/input";
import { Text } from "@/components/text";

const Container = styled("div", {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
    width: "100%",
});

const FieldsWrapper = styled("div", {
    display: "flex",
    flexDirection: "column",
    marginBottom: "1rem",
});

const RemoveButton = styled("button", {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 1.5rem",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    fontFamily: "$main",
    letterSpacing: 2,
    cursor: "pointer",
    color: "$white",
    "&:hover": {
        color: "$secondary",
    },
    "@desktop": {
        height: "$button-desktop-height",
        fontSize: "$normal-desktop",
    },
    "@laptop": {
        height: "$button-laptop-height",
        fontSize: "$normal-laptop",
    },
    "@tablet": {
        height: "$button-tablet-height",
        fontSize: "$normal-tablet",
    },
    "@mobile": {
        height: "$button-mobile-height",
        fontSize: "$normal-mobile",
    },
});

const InputPlain = function ({ errors, idx, name, field, ...props }) {
    return (
        <InputOuterWrapper>
            <InputWrapper>
                <TextInput css={{ width: "100%" }} {...props} {...field} />
                {"teamMembers" in errors && errors.teamMembers[idx]?.[name] && (
                    <ErrorMessage msg={errors.teamMembers[idx][name]} />
                )}
            </InputWrapper>
        </InputOuterWrapper>
    );
};

const InputWithIcon = function ({ errors, icon, idx, name, field, ...props }) {
    return (
        <InputOuterWrapper
            css={{
                gridTemplateColumns: "auto auto",
                gap: "0.25rem",
            }}
        >
            <Text>{icon}</Text>
            <InputWrapper>
                <TextInput css={{ width: "100%" }} {...props} {...field} />
                {"teamMembers" in errors && errors.teamMembers[idx]?.[name] && (
                    <ErrorMessage msg={errors.teamMembers[idx][name]} />
                )}
            </InputWrapper>
        </InputOuterWrapper>
    );
};

export default function TeamSection({
    values,
    errors,
    useInstagramField,
    useNicknameField,
    maxParticipants,
}) {
    function handleAddTeamMember(handlePush) {
        return function () {
            handlePush({
                name: "",
                instagram: null,
                nickname: null,
            });
        };
    }

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
                <FieldArray name="teamMembers">
                    {({ push, remove }) => (
                        <>
                            {values.teamMembers.length > 0 &&
                                values.teamMembers.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={css({
                                            display: "grid",
                                            gap: "1.5rem",
                                            gridTemplateColumns: "1fr auto",
                                        }).toString()}
                                    >
                                        <FieldsWrapper>
                                            <Field
                                                name={`teamMembers.${idx}.name`}
                                            >
                                                {({ field }) => (
                                                    <InputPlain
                                                        name="name"
                                                        placeholder="Type your name here"
                                                        errors={errors}
                                                        field={field}
                                                        idx={idx}
                                                    />
                                                )}
                                            </Field>
                                            {useInstagramField && (
                                                <Field
                                                    name={`teamMembers.${idx}.instagram`}
                                                >
                                                    {({ field }) => (
                                                        <InputWithIcon
                                                            icon="@"
                                                            name="instagram"
                                                            placeholder="Type your instagram username..."
                                                            errors={errors}
                                                            field={field}
                                                            idx={idx}
                                                        />
                                                    )}
                                                </Field>
                                            )}
                                            {useNicknameField && (
                                                <Field
                                                    name={`teamMembers.${idx}.nickname`}
                                                >
                                                    {({ field }) => (
                                                        <InputPlain
                                                            name="nickname"
                                                            placeholder="Type your desired nickname..."
                                                            errors={errors}
                                                            field={field}
                                                            idx={idx}
                                                        />
                                                    )}
                                                </Field>
                                            )}
                                        </FieldsWrapper>
                                        <RemoveButton
                                            type="button"
                                            onClick={() => remove(idx)}
                                        >
                                            Remove
                                        </RemoveButton>
                                    </div>
                                ))}
                            {values.teamMembers.length !== maxParticipants && (
                                <Button
                                    type="button"
                                    color="light"
                                    onClick={handleAddTeamMember(push)}
                                    fullWidth
                                >
                                    Add Team Member
                                </Button>
                            )}
                        </>
                    )}
                </FieldArray>
            </main>
        </Container>
    );
}
