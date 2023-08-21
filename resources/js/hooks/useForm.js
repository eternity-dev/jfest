import { useState } from "react";

export default function useForm(data) {
    const [inputs, setInputs] = useState(data);

    function handleSetInputs(evt) {
        const name = evt.target.name;
        const value = evt.target.value;

        setInputs({
            ...inputs,
            [name]: value,
        });
    }

    return {
        inputs,
        handleChange: handleSetInputs,
    };
}
