import { styled } from "@/root/stitches.config";

import { Text } from "@/components/text";

import { ReactComponent as TagBlue } from "@/assets/activities/tag-blue.svg";
import { ReactComponent as TagOrange } from "@/assets/activities/tag-orange.svg";

const Title = styled(Text, {
    fontSize: "2.5em",
});

export default function HeaderSection({ name, type, isActivity }) {
    return (
        <section
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
            <Title>{name}</Title>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {isActivity ? <TagBlue /> : <TagOrange />}
                <Text css={{ color: isActivity ? "$tertiary" : "$secondary" }}>
                    {type}
                </Text>
            </div>
        </section>
    );
}
