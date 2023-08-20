import { generateMetadata } from "@/utils/helper";

import Activities from "./partials/Activities";
import Bio from "./partials/Bio";
import Hero from "./partials/Hero";
import Special from "./partials/Special";

export default function HomePage({ events, competitions, metadata }) {
    return (
        <>
            {generateMetadata(metadata)}
            <Hero />
            <Bio />
            <Special />
            <Activities events={events} competitions={competitions} />
        </>
    );
}
