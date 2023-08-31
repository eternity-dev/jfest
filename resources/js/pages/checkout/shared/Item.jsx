import { styled } from "@/root/stitches.config";

import { Text } from "@/components/text";

const Container = styled("div", {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    height: "max-content",
    marginBottom: "0.75rem",
});

export default function Item({ data, type }) {
    const isActivity = type === "activity";

    return (
        <Container>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                }}
            >
                <Text
                    css={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: "0.75rem",
                    }}
                >
                    <span>
                        {
                            data.item[isActivity ? "activity" : "competition"]
                                .name
                        }
                    </span>
                    <Text
                        css={{
                            display: "flex",
                            gap: "0.75rem",
                            fontSize: "1rem",
                        }}
                    >
                        <span> X </span>
                        <span>{data.count} pcs</span>
                    </Text>
                </Text>
                <Text
                    css={{
                        color: "rgba(255, 255, 255, 0.5)",
                        fontSize: "1.25rem",
                    }}
                >
                    {isActivity ? "Activity" : "Competition"}
                </Text>
            </div>
            <Text>
                Rp{" "}
                {(
                    (isActivity
                        ? data.item.activity.sale.price
                        : data.item.price) * data.count
                ).toLocaleString("id-ID")}
            </Text>
        </Container>
    );
}
