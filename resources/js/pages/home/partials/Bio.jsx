import { css, styled } from "@/root/stitches.config";
import { Text } from "@/components/text";
import { Title } from "@/components/title";

import bioMaster from "@/assets/misc/bio-master.png";
import bioWeb from "@/assets/misc/bio-web.svg";
import sharedSpiderOrange from "@/assets/misc/shared-spider-orange.svg";

const Container = styled("section", {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    height: "fit-content",
    width: "100%",
    padding: "0rem 5%",
    paddingTop: "2rem",
    paddingBottom: "3rem",
    color: "$white",
    backgroundColor: "$dark",
    "@desktop": { fontSize: "$normal-desktop" },
    "@laptop": { fontSize: "$normal-laptop" },
    "@tablet": { fontSize: "$normal-tablet" },
    "@mobile": { fontSize: "$normal-mobile" },
});

const LeftImage = styled("img", {
    position: "relative",
    display: "block",
    height: "auto",
    width: "100%",
    objectFit: "cover",
    objectPosition: "center",
});

const LeftIconSpider = styled("img", {
    marginTop: "-0.25rem",
    marginRight: "-1rem",
    "@tablet": { width: 120 },
    "@mobile": { width: 100, marginRight: "-0.5rem" },
});

const LeftIconWeb = styled("img", {
    position: "absolute",
    top: 0,
    left: 0,
    "@mobile": { width: 100 },
});

export default function Bio() {
    return (
        <Container>
            <div
                className={css({
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gridColumn: "1 / 7",
                    padding: "2rem",
                    "@mobile": { gridColumn: "1 / -1" },
                }).toString()}
            >
                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        justifyContent: "flex-start",
                        width: "fit-content",
                        padding: "0.75rem",
                        overflow: "hidden",
                    }}
                >
                    <LeftImage src={bioMaster} />
                    <LeftIconSpider
                        src={sharedSpiderOrange}
                        alt="Bio spider icon"
                    />
                    <LeftIconWeb src={bioWeb} alt="Bio web icon" />
                </div>
            </div>
            <div
                className={css({
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    padding: "0 10%",
                    paddingTop: "3rem",
                    gridColumn: "7 / -1",
                    "@mobile": { gridColumn: "1 / -1 ", paddingTop: 0 },
                }).toString()}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2rem",
                    }}
                >
                    <header
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                        }}
                    >
                        <Title
                            css={{
                                fontSize: "3em",
                                "@tablet": { fontSize: "2em" },
                            }}
                        >
                            JFEST
                        </Title>
                        <div
                            className={css({
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "center",
                                gap: "0.75rem",
                                "@tablet": { gap: "0.5rem" },
                                "@mobile": { gap: "0.25rem" },
                            }).toString()}
                        >
                            <Title
                                css={{
                                    fontSize: "1em",
                                    "@tablet": { fontSize: "1em" },
                                }}
                            >
                                By
                            </Title>
                            <Title
                                css={{
                                    fontSize: "2em",
                                    "@tablet": { fontSize: "1.5em" },
                                }}
                            >
                                JCOS
                            </Title>
                        </div>
                    </header>
                    <Text
                        css={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            fontSize: "1em",
                            lineHeight: 1.3,
                            textAlign: "center",
                            "@tablet": { fontSize: "0.75em" },
                        }}
                    >
                        <span>
                            The festival is organized and supported by STIKOM
                            Bali Institute of Technology and Business and is the
                            only festival that promotes Japanese culture on
                            campus and is regularly attended by the Consulate
                            General of Japan in Denpasar.
                        </span>
                        <span>
                            These factors make JFEST one of our means of
                            introducing Japanese culture in a way that is fun
                            and enjoyed by various groups both inside and
                            outside the campus environment.
                        </span>
                    </Text>
                </div>
            </div>
        </Container>
    );
}
