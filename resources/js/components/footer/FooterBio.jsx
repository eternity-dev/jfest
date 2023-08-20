import { css } from "@/root/stitches.config";

import { ReactComponent as JFestLogo } from "@/assets/logo.svg";

import { Text } from "@/components/text";

export default function FooterBio() {
    return (
        <section
            className={css({
                display: "flex",
                flexDirection: "column",
                gridColumn: "1 / 7",
                gap: "2rem",
                zIndex: 2,
                "@tablet": { gridColumn: "1 / -1" },
                "@mobile": { gridColumn: "1 / -1" },
            }).toString()}
        >
            <div
                className={css({
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    height: "fit-content",
                    width: "fit-content",
                    gap: "1.5rem",
                }).toString()}
            >
                <JFestLogo
                    className={css({
                        width: 45,
                        "@mobile": { width: 40 },
                    }).toString()}
                />
            </div>
            <Text
                css={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
                <span>
                    The festival is organized and supported by STIKOM Bali
                    Institute of Technology and Business and is the only
                    festival that promotes Japanese culture on campus and is
                    regularly attended by the Consulate General of Japan in
                    Denpasar.
                </span>
                <span>
                    These factors make JFEST one of our means of introducing
                    Japanese culture in a way that is fun and enjoyed by various
                    groups both inside and outside the campus environment.
                </span>
            </Text>
        </section>
    );
}
