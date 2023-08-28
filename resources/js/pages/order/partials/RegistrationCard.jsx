import { confirmAlert } from "react-confirm-alert";
import { useWindowSize } from "@uidotdev/usehooks";
import { router } from "@inertiajs/react";

import { css, styled } from "@/root/stitches.config";

import { Button } from "@/components/button";
import { Text } from "@/components/text";

const Wrapper = styled("div", {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "min-content",
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

function ConfirmRemoveElement({ removeItemUrl }) {
    function handleRemoveItem(handleClose) {
        return () => {
            handleClose();
            return router.delete(removeItemUrl);
        };
    }

    return ({ onClose: handleClose }) => (
        <div
            className={css({
                position: "absolute",
                top: "50%",
                left: "50%",
                display: "flex",
                flexDirection: "column",
                gap: "2rem 1.5rem",
                transform: "translate(-50%, -50%)",
                width: "fit-content",
                height: "fit-content",
                padding: "1.5rem",
                backgroundColor: "$white",
                borderRadius: "0.5rem",
                zIndex: 99,
            }).toString()}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    textAlign: "center",
                }}
            >
                <Text css={{ color: "$dark", fontSize: "2rem" }}>
                    Remove it?
                </Text>
                <Text css={{ color: "$dark", fontSize: "1.25rem" }}>
                    Are you sure you want to remove this item?
                </Text>
            </div>
            <div
                className={css({
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                    height: "fit-content",
                    "@mobile": {
                        flexDirection: "column",
                        gap: "0.5rem",
                    },
                }).toString()}
            >
                <Button color="light" onClick={handleClose} fullWidth>
                    No, Keep It!
                </Button>
                <Button onClick={handleRemoveItem(handleClose)} fullWidth>
                    Yes, Delete It!
                </Button>
            </div>
        </div>
    );
}

export default function RegistrationCard({ data }) {
    const { width } = useWindowSize();

    function handleRemoveOrder() {
        return confirmAlert({
            customUI: ConfirmRemoveElement({ removeItemUrl: data.remove_url }),
            closeOnClickOutside: true,
            closeOnEscape: true,
            overlayClassName: css({
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(13, 59, 68, 0.25)",
                backdropFilter: "blur(6.6px)",
                zIndex: 98,
            }).toString(),
        });
    }

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
                <RemoveButton onClick={handleRemoveOrder}>Remove</RemoveButton>
            </div>
        </Wrapper>
    );
}
