import { router } from "@inertiajs/react";
import { createContext, useState } from "react";

const defaultAuth = {
    auth: null,
    isAuthenticated: false,
};

const AuthContext = createContext(defaultAuth);

export function AuthProvider({ auth, children }) {
    const [authenticatable, setAuthenticatable] = useState(() => {
        if (auth) return { ...auth };
        else return defaultAuth;
    });

    function revokeAuth(revokeUrl) {
        setAuthenticatable(defaultAuth);
        router.visit(revokeUrl);
    }

    return (
        <AuthContext.Provider
            value={{
                auth: authenticatable.data,
                isAuthenticated: authenticatable.isAuthenticated,
                revokeAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
