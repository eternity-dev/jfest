import { Text } from "@/components/text";

import { ReactComponent as Dollar } from "@/assets/icons/dollar.svg";

export default function DescriptionSection({ description }) {
    return (
        <section
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
            <Text css={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <Dollar />
                Description
            </Text>
            <Text css={{ color: "rgba(255, 255, 255, 0.45)" }}>
                {description}
            </Text>
        </section>
    );
}
