import { css, styled } from "@/root/stitches.config";

import { Text } from "@/components/text";
import { useWindowSize } from "@uidotdev/usehooks";

const Wrapper = styled("div", {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "min-content",
});

export default function RegistrationCard({ data }) {
    const { width } = useWindowSize();

    return (
        <Wrapper>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                }}
            >
                <Text>Competition {data.competition.name}</Text>
                <Text
                    css={{
                        color: "rgba(255, 255, 255, 0.5)",
                        fontSize: "1rem",
                    }}
                >
                    Competition - {data.competition.registrationCloseAtStr}
                </Text>
            </div>
            <div
                className={css({
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: "2rem",
                    "@mobile": { gap: "1rem" },
                }).toString()}
            >
                {width > 768 && (
                    <Text
                        css={{
                            color: "rgba(255, 255, 255, 0.5)",
                            fontSize: "1.5rem",
                            "@mobile": { fontSize: "1.25rem" },
                        }}
                    >
                        Rp {data.price.toLocaleString("id-ID")}
                    </Text>
                )}
                {!data.uuid && (
                    <Text
                        css={{
                            color: "$tertiary",
                            fontSize: "1.5rem",
                            textAlign: "right",
                            "@mobile": { fontSize: "1.25rem" },
                        }}
                    >
                        Pending
                    </Text>
                )}
            </div>
        </Wrapper>
    );
}
