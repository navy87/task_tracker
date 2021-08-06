import React, { useState } from "react";
import styled from "styled-components";

let LabelStyled = styled.label`
    display: inline-flex;
    gap: 2px;
    justify-content: center;
    align-items: center;

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

const CheckBox = ({ render, id, name, value }) => {
    const [checked, setChecked] = useState(value);

    LabelStyled = styled(LabelStyled)`
        background-color: ${checked ? "white" : "lightgray"};
    `;

    return (
        <LabelStyled htmlFor={id}>
            {render}
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
