import React from "react";
import RadioButton from "../helpers/RadioButton";
import {
    FcHighPriority,
    FcLowPriority,
    FcMediumPriority,
} from "react-icons/fc";

const PriorityInfo = () => {
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
                value="high"
            />
            <RadioButton
                id="mid_priority_info"
                name="priority"
                render={
                    <>
                        <FcMediumPriority /> Medium
                    </>
                }
                value="mid"
            />
            <RadioButton
                id="low_priority_info"
                name="priority"
                render={
                    <>
                        <FcLowPriority /> Low
                    </>
                }
                value="low"
            />
        </div>
    );
};

export default PriorityInfo;
