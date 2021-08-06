import React from "react";
import {
    FcHighPriority,
    FcLowPriority,
    FcMediumPriority,
} from "react-icons/fc";
import PriorityCheckbox from "./PriorityCheckbox";

const PriorityFilter = () => {
    return (
        <div>
            <PriorityCheckbox
                render={
                    <>
                        <FcLowPriority /> Low
                    </>
                }
                id="low_priority"
                value="low"
            />
            <PriorityCheckbox
                render={
                    <>
                        <FcMediumPriority /> Medium
                    </>
                }
                id="mid_priority"
                value="mid"
            />
            <PriorityCheckbox
                render={
                    <>
                        <FcHighPriority /> High
                    </>
                }
                id="high_priority"
                value="high"
            />
        </div>
    );
};

export default PriorityFilter;
