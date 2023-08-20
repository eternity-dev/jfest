import { createContext } from "react";

const NavbarContext = createContext([]);

export function NavbarProvider({ links, children }) {
    return (
        <NavbarContext.Provider value={links}>
            {children}
        </NavbarContext.Provider>
    );
}

export default NavbarContext;
