import { Link, router } from "@inertiajs/react";
import axios from "axios";

import { css, styled } from "@/root/stitches.config";

import useAuth from "@/hooks/useAuth";
import useNavbar from "@/hooks/useNavbar";

import { Button } from "@/components/button";
import { Grid } from "@/components/grid";
import { Divider } from "@/components/divider";
import { Title } from "@/components/title";
import { Text } from "@/components/text";

import ComingSoon from "@/assets/misc/coming-soon.png";
import FrameBlue from "@/assets/activities/frame-blue.svg";
import FrameOrange from "@/assets/activities/frame-orange.svg";
import { ReactComponent as TagBlue } from "@/assets/activities/tag-blue.svg";
import { ReactComponent as TagOrange } from "@/assets/activities/tag-orange.svg";

const Container = styled("section", {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "2.5rem",
    padding: "3rem 5%",
    backgroundColor: "$dark",
});

const Activity = styled("article", {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
});

const ActivityImage = styled("span", {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    height: 350,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    variants: {
        frame: {
            activity: {
                backgroundImage: `url("${FrameBlue}")`,
            },
            competition: {
                backgroundImage: `url("${FrameOrange}")`,
            },
        },
    },
});

const ActivityBody = styled("div", {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    padding: "0",
    "@tablet": { padding: "0 1rem" },
    "@mobile": { padding: "0 1rem" },
});

const ActivityTag = styled("div", {
    display: "flex",
    gap: "0.5rem",
    variants: {
        tag: {
            activity: { color: "$tertiary" },
            competition: { color: "$secondary" },
        },
    },
});

export default function Activities({ activities, competitions }) {
    const joinedActivities = [...activities, ...competitions];

    const { isAuthenticated } = useAuth();
    const {
        links: { authUrl },
    } = useNavbar();

    async function handleRedirectToOrderPage(orderUrl) {
        if (isAuthenticated) {
            return router.visit(orderUrl);
        }

        const response = await axios.get(authUrl.attempt);

        if (response.status === 200) {
            return window.location.replace(response.data.meta.redirectUrl);
        }
    }

    return (
        <Container>
            <header
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                }}
            >
                <Title>Activities</Title>
                <Divider css={{ marginBottom: "1rem" }} />
                <div
                    className={css({
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem",
                        width: "100%",
                        "@mobile": { flexDirection: "column" },
                    }).toString()}
                >
                    <Button color="light" fullWidth>
                        Alls
                    </Button>
                    <Button color="light" fullWidth>
                        Activities
                    </Button>
                    <Button color="light" fullWidth>
                        Competitions
                    </Button>
                </div>
            </header>
            <Grid
                cols={3}
                css={{
                    color: "$white",
                    borderTop: "1.5px solid $primary",
                    padding: "2rem 0",
                }}
            >
                {joinedActivities.map((activity) => {
                    const isActivity =
                        activity.type.toLowerCase() === "activity";

                    return (
                        <Link
                            key={activity.id}
                            href={activity.details_url}
                            style={{ textDecoration: "none" }}
                        >
                            <Activity key={activity.id}>
                                <ActivityImage frame={activity.type}>
                                    {activity.image_url ? (
                                        <img
                                            className={css({
                                                height: "80%",
                                                width: "80%",
                                                objectFit: "contain",
                                                objectPosition: "center",
                                            }).toString()}
                                            src={activity.image_url}
                                            alt="Coming soon"
                                        />
                                    ) : (
                                        <img
                                            className={css({
                                                height: "55%",
                                                width: "55%",
                                                objectFit: "contain",
                                                objectPosition: "center",
                                            }).toString()}
                                            src={ComingSoon}
                                            alt="Coming soon"
                                        />
                                    )}
                                </ActivityImage>
                                <ActivityBody>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Text>{activity.name}</Text>
                                        <ActivityTag tag={activity.type}>
                                            {isActivity ? (
                                                <TagBlue width={12.5} />
                                            ) : (
                                                <TagOrange width={12.5} />
                                            )}
                                            <Text
                                                css={{
                                                    fontSize: "1rem",
                                                    color: isActivity
                                                        ? "$tertiary"
                                                        : "$secondary",
                                                }}
                                            >
                                                {activity.type}
                                            </Text>
                                        </ActivityTag>
                                    </div>
                                    <Text
                                        css={{
                                            color: "rgba(255, 255, 255, .5)",
                                        }}
                                    >
                                        Rp{" "}
                                        {activity.price.toLocaleString("id-ID")}
                                    </Text>
                                </ActivityBody>
                                <Link
                                    style={{ textDecoration: "none" }}
                                    onClick={(evt) => {
                                        evt.preventDefault();
                                        handleRedirectToOrderPage(
                                            activity.order_url
                                        );
                                    }}
                                >
                                    <Button color="light" fullWidth>
                                        {isActivity
                                            ? "Order Now"
                                            : "Register Now"}
                                    </Button>
                                </Link>
                            </Activity>
                        </Link>
                    );
                })}
            </Grid>
        </Container>
    );
}
