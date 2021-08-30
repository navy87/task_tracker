import React, {useContext, useEffect, useState} from "react";
import {FilterContext} from "../../../../contexts/SidebarContext";

const PriorityCheckbox = ({render, id, value}) => {
    const [checked, setChecked] = useState(true);
    const {setFilteredPriorities} = useContext(FilterContext);

    useEffect(() => {
        const filterData = () => {
            setFilteredPriorities((oldPriorities) => {
                if (!checked) {
                    oldPriorities.delete(value);
                } else {
                    oldPriorities.add(value);
                }
                return new Set([...oldPriorities]);
            });
        };
        filterData();
    }, [checked, setFilteredPriorities, value]);

    return (
        <label
            htmlFor={id}
            className={`custom_checkbox_label ${checked && "checked"}`}
        >
            {render}
            <input
                id={id}
                type="checkbox"
                name="priority"
                value={value}
                checked={checked}
                onChange={() => setChecked((prevChecked) => !prevChecked)}
            />
        </label>
    );
};

export default PriorityCheckbox;
