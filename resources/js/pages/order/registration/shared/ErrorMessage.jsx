import { Text } from "@/components/text";

export default function ErrorMessage({ msg }) {
    return <Text css={{ fontSize: "1.25rem", color: "#ff3333" }}>{msg}</Text>;
}
