import { useToggle } from "@uidotdev/usehooks";
import html2canvas from "html2canvas";
import Modal from "react-modal";
import { QRCode } from "react-qrcode-logo";

import { css, styled } from "@/root/stitches.config";

import { Button } from "@/components/button";
import { Text } from "@/components/text";

import Logo from "@/assets/logo.svg";

const Container = styled("div", {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    height: "max-content",
    marginBottom: "0.75rem",
    "@mobile": { flexDirection: "column", gap: "1rem" },
});

export default function Item({ data, type }) {
    const isActivity = type === "activity";
    const [showQR, toggleShowQR] = useToggle(false);

    function handleDownloadQRCode() {
        html2canvas(document.getElementById(data.code)).then((canvas) => {
            const ctaDownload = document.createElement("a");

            ctaDownload.href = canvas.toDataURL();
            ctaDownload.download = `${data.code}.png`;
            ctaDownload.click();
        });
    }

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
                        {data[isActivity ? "activity" : "competition"].name}
                    </span>
                </Text>
                {isActivity && (
                    <div
                        className={css({
                            display: "flex",
                            gap: "1rem",
                            "@mobile": {
                                flexDirection: "column",
                                gap: "0.5rem",
                            },
                        }).toString()}
                    >
                        <Text
                            css={{
                                color: "rgba(255, 255, 255, 0.5)",
                                fontSize: "1.25rem",
                            }}
                        >
                            Ticket Code: {data.code}
                        </Text>
                        <Text
                            css={{
                                display: "flex",
                                gap: "0.75rem",
                                color: "rgba(255, 255, 255, 0.5)",
                                fontSize: "1.25rem",
                            }}
                        >
                            Status:{" "}
                            <Text
                                css={{
                                    color:
                                        data.attended_status !== "attended"
                                            ? "#ff3333"
                                            : "$white",
                                    fontSize: "1.25rem",
                                }}
                            >
                                {data.attended_status !== "attended"
                                    ? "Not Attended Yet"
                                    : "Already Attended"}
                            </Text>
                        </Text>
                    </div>
                )}
            </div>
            <Button color="light" onClick={toggleShowQR}>
                Print Ticket
            </Button>
            <Modal
                contentLabel={`Ticket QR`}
                isOpen={showQR}
                onRequestClose={toggleShowQR}
                shouldCloseOnEsc={true}
                shouldCloseOnOverlayClick={true}
                style={{
                    overlay: {
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "rgba(13, 59, 68, 0.25)",
                        backdropFilter: "blur(6.6px)",
                        height: "100vh",
                        padding: 0,
                        zIndex: 98,
                    },
                    content: {
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        width: "fit-content",
                        height: "fit-content",
                        margin: 0,
                        zIndex: 99,
                    },
                }}
            >
                <QRCode
                    value={data.code}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    id={data.code}
                    logoHeight={50}
                    logoWidth={50}
                    logoPadding={5}
                    logoImage={Logo}
                    logoPaddingStyle="circle"
                    size={250}
                    quietZone={10}
                    ecLevel="H"
                />
                <Button onClick={handleDownloadQRCode} fullWidth>
                    Download Qr
                </Button>
            </Modal>
        </Container>
    );
}
