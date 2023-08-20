import { Head } from "@inertiajs/react";

export function generateMetadata(metadata = {}) {
    return (
        <Head>
            {Object.entries(metadata).map(([key, value]) => {
                if (key.toLowerCase() === "title") {
                    return <title>{value}</title>;
                }

                return <meta name={key} content={value} />;
            })}
        </Head>
    );
}
