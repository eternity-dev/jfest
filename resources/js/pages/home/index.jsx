import { generateMetadata } from "@/utils/helper";

import Activities from "./partials/Activities";
import Bio from "./partials/Bio";
import Hero from "./partials/Hero";
import Special from "./partials/Special";

import withNavbarMobile from "@/hooks/hoc/withNavbarMobile";

function HomePage({ activities, competitions, meta }) {
    return (
        <>
            {generateMetadata(meta.head)}
            <Hero />
            <Bio />
            <Special />
            <Activities activities={activities} competitions={competitions} />
        </>
    );
}

export default withNavbarMobile(HomePage);
