import React, { useContext, useEffect, useState } from "react";
import { FilterContext } from "../../../contexts/SidebarContext";

const PriorityCheckbox = ({ render, id, name, value }) => {
    const [checked, setChecked] = useState(true);
    const { setFilteredPriorities } = useContext(FilterContext);

    useEffect(() => {
        const filterData = () => {
            setFilteredPriorities((oldPriorities) => {
                if (!checked) {
                    oldPriorities.delete(value);
                } else {
                    oldPriorities.add(value);
                }
                // const newPriorities = ;
                return new Set([...oldPriorities]);
            });
        };
        filterData();
    }, [checked, setFilteredPriorities, value]);

    const changed = (e) => {
        console.log("Changed");
        setChecked((prevChecked) => !prevChecked);
    };

    return (
        <label
            htmlFor={id}
            className={`custom_checkbox_label ${checked && "checked"}`}
        >
            {render}
            <input
                id={id}
                type="checkbox"
                name={name}
                value={value}
                checked={checked}
                onChange={changed}
            />
        </label>
    );
};

export default PriorityCheckbox;
