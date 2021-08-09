import React, { useState } from "react";
import RadioButton from "../../helpers/RadioButton";
import {
    FcHighPriority,
    FcLowPriority,
    FcMediumPriority,
} from "react-icons/fc";

const PriorityInfo = () => {
    const [checked, setChecked] = useState("high");

    return (
        <div>
            <RadioButton
                id="high_priority_info"
                name="priority"
                render={
                    <>
                        <FcHighPriority /> High
                    </>
                }
                checked={checked === "high"}
                value="high"
                setChecked={setChecked}
            />
            <RadioButton
                id="mid_priority_info"
                name="priority"
                render={
                    <>
                        <FcMediumPriority /> Medium
                    </>
                }
                checked={checked === "mid"}
                value="mid"
                setChecked={setChecked}
            />
            <RadioButton
                id="low_priority_info"
                name="priority"
                render={
                    <>
                        <FcLowPriority /> Low
                    </>
                }
                checked={checked === "low"}
                value="low"
                setChecked={setChecked}
            />
        </div>
    );
};

export default PriorityInfo;
