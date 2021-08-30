import React, {useState} from "react";

const CheckBox = ({render, id, name, value}) => {
    const [checked, setChecked] = useState(value);

    return (
        <label
            htmlFor={id}
            className={`checkbox_label ${checked && "checked"}`}
        >
            {render}
            <input
                id={id}
                type="checkbox"
                name={name}
                value={value}
                checked={checked}
                onChange={() => setChecked(!checked)}
            />
        </label>
    );
};

export default CheckBox;
