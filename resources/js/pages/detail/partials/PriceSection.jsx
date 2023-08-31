import { css } from "@/root/stitches.config";

import { Button } from "@/components/button";
import { Text } from "@/components/text";

import { ReactComponent as Dollar } from "@/assets/icons/dollar.svg";

export default function PriceSection({
    price,
    priceTag,
    isActivity,
    isTicketsAvailable,
    orderUrl,
}) {
    return (
        <section
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
            <Text css={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <Dollar />
                <span>{isActivity ? "Price" : "Registration Fee"}</span>
            </Text>
            <Text css={{ color: "rgba(255, 255, 255, 0.45)" }}>
                Rp {price.toLocaleString("id-ID")} {priceTag && `(${priceTag})`}
            </Text>
            {isActivity && !isTicketsAvailable ? (
                <div
                    className={css({
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "max-content",
                        padding: "0rem 0rem",
                        height: "$button-desktop-height",
                        "@laptop": {
                            height: "$button-laptop-height",
                        },
                        "@tablet": {
                            height: "$button-tablet-height",
                        },
                        "@mobile": {
                            height: "$button-mobile-height",
                        },
                    }).toString()}
                >
                    <Text css={{ color: "$secondary" }}>Sold Out</Text>
                </div>
            ) : (
                <Button
                    color="light"
                    css={{ "@mobile": { width: "100%" } }}
                    as="a"
                    href={orderUrl}
                >
                    {isActivity ? "Order Now" : "Register Now"}
                </Button>
            )}
        </section>
    );
}
