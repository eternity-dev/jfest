import { css, styled } from "@/root/stitches.config";

import { Button } from "@/components/button";
import { Divider } from "@/components/divider";
import { Title } from "@/components/title";

import backdropMobile from "@/assets/misc/hero-backdrop-mobile.png";
import backdrop from "@/assets/misc/hero-backdrop.png";

import pointDown from "@/assets/icons/point-down.svg";

const mediaOrientationLandscape = `@media screen and ${[
    "(max-width: 950px)",
    "(min-height: 100px)",
    "(orientation: landscape)",
].join(" and ")}`;

const Container = styled("section", {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "$primary",
    "@desktop": { height: "155vh" },
    "@laptop": { height: "142.5vh" },
    "@tablet": { height: "100vh" },
    "@mobile": { height: "135vh" },
    [mediaOrientationLandscape]: {
        height: "210vh",
    },
});

const Backdrop = styled("div", {
    position: "absolute",
    left: 0,
    bottom: 0,
    display: "block",
    width: "100%",
    height: "100%",
    backgroundSize: "100%, auto",
    backgroundPositionX: "center",
    backgroundPositionY: "bottom",
    backgroundRepeat: "no-repeat",
    "@desktop": { backgroundImage: `url("${backdrop}")` },
    "@laptop": { backgroundImage: `url("${backdrop}")` },
    "@tablet": { backgroundImage: `url("${backdrop}")` },
    "@mobile": { backgroundImage: `url("${backdropMobile}")` },
});

export default function Hero() {
    return (
        <Container>
            <Backdrop />
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingBottom: "10rem",
                    gap: "2rem",
                    zIndex: 1,
                }).toString()}
            >
                <Title css={{ textAlign: "center" }}>
                    <span>HYAKKI</span>
                    <span>YAGYO</span>
                </Title>
                <Divider />
                <Button as="a" href="/activities">
                    See Activities
                </Button>
            </div>
            <div
                className={css({
                    position: "absolute",
                    bottom: "2.5rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                    color: "$white",
                    fontFamily: "$main",
                    fontSize: "1.5em",
                    pointerEvents: "none",
                    zIndex: 1,
                    [mediaOrientationLandscape]: {
                        bottom: "3rem",
                    },
                }).toString()}
            >
                <span>Scroll Down</span>
                <img
                    src={pointDown}
                    alt="Point down icon"
                    style={{ height: 25, width: 25 }}
                />
            </div>
        </Container>
    );
}
