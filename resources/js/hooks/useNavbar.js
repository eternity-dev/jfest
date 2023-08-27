import { useContext } from "react";
import NavbarContext from "@/providers/NavbarProvider";

export default function useNavbar() {
    return useContext(NavbarContext);
}
