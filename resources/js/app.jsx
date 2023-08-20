import { createInertiaApp } from "@inertiajs/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { globalCss } from "@/root/stitches.config";

import { AuthProvider } from "@/providers/AuthProvider";
import { NavbarProvider } from "@/providers/NavbarProvider";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

import dreadful from "@/assets/fonts/dreadful.otf";
import jack from "@/assets/fonts/jack-reacher.ttf";

const globalStyles = globalCss({
    "@font-face": [
        { fontFamily: "dreadful", src: `url("${dreadful}")` },
        { fontFamily: "jack", src: `url("${jack}")` },
    ],
    "*, html": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        scrollBehavior: "smooth",
        overflowX: "hidden",
    },
    body: {
        fontFamily: "$main",
        fontSize: "$main",
        letterSpacing: 1.1,
    },
});

function Wrapper({ children, links, auth }) {
    globalStyles();

    return (
        <AuthProvider auth={auth}>
            <NavbarProvider links={links}>
                <Navbar />
                {children}
                <Footer />
            </NavbarProvider>
        </AuthProvider>
    );
}

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./pages/**/*.jsx", { eager: true });
        return pages[`./pages/${name}.jsx`];
    },
    setup: ({ App, el, props }) => {
        const pageProps = props.initialPage.props;

        createRoot(el).render(
            <StrictMode>
                <Wrapper {...pageProps}>
                    <App {...props} />
                </Wrapper>
            </StrictMode>
        );
    },
});
