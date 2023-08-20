import { generateMetadata } from "@/utils/helper";

import Activities from "./partials/Activities";
import Bio from "./partials/Bio";
import Hero from "./partials/Hero";
import Special from "./partials/Special";

export default function HomePage({ activities, competitions, meta }) {
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
