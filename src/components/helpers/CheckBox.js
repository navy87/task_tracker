import React, { useEffect, useState } from "react";
import styled from "styled-components";

let LabelStyled = styled.label`
    cursor: pointer;
    padding: 0.25rem 0.75rem;
    background-color: white;
    color: black;
    margin: 0 0.1rem;
    border-radius: 0.25rem;
`;

const InputStyled = styled.input`
    display: none;
`;

const CheckBox = ({ text, id, name, value }) => {
    const [checked, setChecked] = useState(value);

    LabelStyled = styled(LabelStyled)`
        background-color: ${checked ? "white" : "lightgray"};
    `;

    return (
        <LabelStyled for={id}>
            {text}
            <InputStyled
                id={id}
                type="checkbox"
                name={name}
                value={value}
                checked={checked}
                onChange={() => setChecked(!checked)}
            />
        </LabelStyled>
    );
};

export default CheckBox;
