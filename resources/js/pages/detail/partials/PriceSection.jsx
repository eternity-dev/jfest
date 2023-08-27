import { Button } from "@/components/button";
import { Text } from "@/components/text";

import { ReactComponent as Dollar } from "@/assets/icons/dollar.svg";

export default function PriceSection({
    price,
    priceTag,
    isActivity,
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
            <Button
                color="light"
                css={{ "@mobile": { width: "100%" } }}
                as="a"
                href={orderUrl}
            >
                {isActivity ? "Order Now" : "Register Now"}
            </Button>
        </section>
    );
}
