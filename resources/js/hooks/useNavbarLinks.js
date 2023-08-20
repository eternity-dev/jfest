import { useContext } from "react";
import NavbarContext from "@/providers/NavbarProvider";

export default function useNavbarLinks() {
    return useContext(NavbarContext);
}
