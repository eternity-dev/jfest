import { NavbarResponsive } from "@/components/navbar";

export default function withNavbarMobile(WrappedComponent) {
    return function Wrapper({ ...props }) {
        return (
            <>
                <NavbarResponsive />
                <WrappedComponent {...props} />
            </>
        );
    };
}
