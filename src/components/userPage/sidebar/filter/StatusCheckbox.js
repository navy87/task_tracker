import React, {useContext, useEffect, useState} from "react";
import {FilterContext} from "../../../../contexts/SidebarContext";

const StatusCheckbox = ({render, id, value}) => {
    const [checked, setChecked] = useState(true);
    const {setFilteredStatuses} = useContext(FilterContext);

    useEffect(() => {
        const filterData = () => {
            setFilteredStatuses((oldStatuses) => {
                if (!checked) {
                    oldStatuses.delete(value);
                } else {
                    oldStatuses.add(value);
                }
                return new Set([...oldStatuses]);
            });
        };
        filterData();
    }, [checked, setFilteredStatuses, value]);

    return (
        <label
            htmlFor={id}
            className={`custom_checkbox_label ${checked && "checked"}`}
        >
            {render}
            <input
                id={id}
                type="checkbox"
                value={value}
                checked={checked}
                onChange={() => setChecked((prevChecked) => !prevChecked)}
            />
        </label>
    );
};

export default StatusCheckbox;
