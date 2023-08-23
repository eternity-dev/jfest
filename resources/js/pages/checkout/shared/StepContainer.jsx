import { css } from "@/root/stitches.config";

export default function StepContainer({ children }) {
    return (
        <div
            className={css({
                display: "flex",
                justifyContent: "flex-start",
                gap: "2rem",
                width: "100%",
                paddingBottom: "1.5rem",
                borderBottom: "1.5px solid rgba(255, 255, 255, 0.1)",
                "@mobile": {
                    gap: "1rem",
                    paddingBottom: "1.25rem",
                },
            }).toString()}
        >
            {children}
        </div>
    );
}
