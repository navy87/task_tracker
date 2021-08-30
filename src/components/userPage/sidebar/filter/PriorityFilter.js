import React from "react";
import {FcHighPriority, FcLowPriority, FcMediumPriority,} from "react-icons/fc";
import PriorityCheckbox from "./PriorityCheckbox";

const PriorityFilter = () => {
    return (
        <div>
            <PriorityCheckbox
                render={
                    <>
                        <FcLowPriority/> Low
                    </>
                }
                id="low_priority"
                value="low"
            />
            <PriorityCheckbox
                render={
                    <>
                        <FcMediumPriority/> Medium
                    </>
                }
                id="medium_priority"
                value="medium"
            />
            <PriorityCheckbox
                render={
                    <>
                        <FcHighPriority/> High
                    </>
                }
                id="high_priority"
                value="high"
            />
        </div>
    );
};

export default PriorityFilter;
