import React from "react";

const RadioButton = ({ render, id, name, value, checked, setChecked }) => {
    const changed = (e) => {
        if (e.target.checked) {
            setChecked(value);
        }
    };

    return (
        <label htmlFor={id} className={`radio_label ${checked && "checked"}`}>
            {render}
            <input
                id={id}
                type="radio"
                name={name}
                value={value}
                onChange={changed}
                checked={checked}
            />
        </label>
    );
};

export default RadioButton;
