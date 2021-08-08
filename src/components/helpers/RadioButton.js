import React, { useState } from "react";
import styled from "styled-components";

let LabelStyled = styled.label`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;

    cursor: pointer;
    padding: 5px 10px;
    color: black;
    margin: 0 0.1rem;
    border-radius: 0.25rem;
    font-size: 0.8rem;
    font-weight: bold;
`;

const InputStyled = styled.input`
    /* display: none; */
`;

const RadioButton = ({ render, id, name, value }) => {
    const [checked, setChecked] = useState(value);

    LabelStyled = styled(LabelStyled)`
        background-color: ${checked ? "white" : "lightgray"};
    `;

    return (
        <LabelStyled htmlFor={id}>
            {render}
            <InputStyled
                id={id}
                type="radio"
                name={name}
                value={value}
                onChange={(e) => {
                    setChecked(e.target.checked);
                    console.log(value + ": " + e.target.checked);
                }}
            />
        </LabelStyled>
    );
};

export default RadioButton;
