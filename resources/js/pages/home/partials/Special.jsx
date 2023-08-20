import { styled } from "@/root/stitches.config";
import { useWindowSize } from "@uidotdev/usehooks";

import sharedLandMobile from "@/assets/misc/shared-land-mobile.png";
import sharedLand from "@/assets/misc/shared-land.png";
import specialBackdropMobile from "@/assets/misc/special-backdrop-mobile.png";
import specialBackdrop from "@/assets/misc/special-backdrop.png";
import ticketDateMobile from "@/assets/tickets/date-mobile.png";
import ticketDate from "@/assets/tickets/date.png";
import ticketEventMobile from "@/assets/tickets/event-mobile.png";
import ticketEvent from "@/assets/tickets/event.png";

const Container = styled("section", {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "110vh",
    padding: "0 5%",
    backgroundColor: "$primary",
    backgroundImage: `url("${specialBackdrop}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% contain",
    backgroundPosition: "bottom",
    overflowY: "hidden",
    "&::after": {
        content: `url("${sharedLand}")`,
        position: "absolute",
        top: 0,
        left: 0,
        display: "block",
        width: "100%",
        height: "fit-content",
        "@mobile": { content: `url("${sharedLandMobile}")` },
    },
    "&::before": {
        content: `url("${sharedLand}")`,
        position: "absolute",
        left: 0,
        bottom: -1,
        transform: "rotate(180deg)",
        display: "block",
        width: "100%",
        height: "fit-content",
        "@mobile": { content: `url("${sharedLandMobile}")` },
    },
    "@mobile": {
        backgroundImage: `url("${specialBackdropMobile}")`,
        backgroundPosition: "bottom",
    },
});

const InnerContainer = styled("div", {
    display: "flex",
    gap: "0.5rem",
    height: "40%",
    "@tablet": { height: "30%" },
    "@mobile": {
        flexDirection: "column",
        height: "fit-content",
    },
});

export default function Special() {
    const { width } = useWindowSize();

    const isMobile = width < 769;
    const imgEvent = isMobile ? ticketEventMobile : ticketEvent;
    const imgDate = isMobile ? ticketDateMobile : ticketDate;

    return (
        <Container>
            <InnerContainer>
                <img src={imgEvent} alt="Ticket Event" />
                <img src={imgDate} alt="Ticket Date" />
            </InnerContainer>
        </Container>
    );
}
