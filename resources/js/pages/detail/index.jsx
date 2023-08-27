import { css, styled } from "@/root/stitches.config";

import { Text } from "@/components/text";

import { generateMetadata } from "@/utils/helper";
import withNavbarMobile from "@/hooks/hoc/withNavbarMobile";

import Image from "./partials/Image";
import HeaderSection from "./partials/HeaderSection";
import PriceSection from "./partials/PriceSection";
import DescriptionSection from "./partials/DescriptionSection";

const Container = styled("section", {
    display: "block",
    height: "max-content",
    width: "100%",
    padding: "2rem 5%",
    backgroundColor: "$dark",
    "@desktop": { paddingTop: "9.5rem" },
    "@laptop": { paddingTop: "9rem" },
    "@tablet": { paddingTop: "8.5rem" },
    "@mobile": { paddingTop: "7.5rem" },
});

const Divider = styled("span", {
    display: "block",
    width: "100%",
    height: 1.5,
    backgroundColor: "rgba(255, 255, 255, .1)",
});

function DetailPage({ data, links: { orderUrl }, meta }) {
    const isActivity = data.type.toLowerCase() === "activity";

    return (
        <>
            {generateMetadata(meta.head)}
            <Container>
                <div
                    className={css({
                        display: "grid",
                        gridTemplateColumns: "350px auto",
                        gap: "4rem",
                        "@mobile": {
                            gridTemplateColumns: "repeat(1, 1fr)",
                            gap: "2rem",
                        },
                    }).toString()}
                >
                    <Image type={data.type} src={data.image_url} />
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1.25rem",
                        }}
                    >
                        <HeaderSection
                            name={data.name}
                            type={data.type}
                            isActivity={isActivity}
                        />
                        <Divider />
                        <PriceSection
                            price={data.price}
                            priceTag={data.price_tag}
                            isActivity={isActivity}
                            orderUrl={orderUrl}
                        />
                        <Divider />
                        <DescriptionSection description={data.description} />
                    </div>
                </div>
            </Container>
        </>
    );
}

export default withNavbarMobile(DetailPage);
