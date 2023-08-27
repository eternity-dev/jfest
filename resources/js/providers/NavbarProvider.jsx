import { useToggle, useWindowSize } from "@uidotdev/usehooks";
import { createContext } from "react";

const NavbarContext = createContext({
    links: {},
    isMobileNavbarDisplayed: false,
    isMobileNavbarOpened: false,
    toggleIsMobileNavbarOpened: null,
});

export function NavbarProvider({ links, children }) {
    const [isMobileNavbarOpened, toggleIsMobileNavbarOpened] = useToggle(false);
    const { width } = useWindowSize();

    return (
        <NavbarContext.Provider
            value={{
                links,
                isMobileNavbarDisplayed: width < 500,
                isMobileNavbarOpened,
                toggleIsMobileNavbarOpened,
            }}
        >
            {children}
        </NavbarContext.Provider>
    );
}

export default NavbarContext;
