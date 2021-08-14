import React, { useEffect, useState } from "react";
import RadioButton from "../../helpers/RadioButton";
import {
    FcHighPriority,
    FcLowPriority,
    FcMediumPriority,
} from "react-icons/fc";

const PriorityInfo = ({ selectedTask, setSelectedTask }) => {
    const [checked, setChecked] = useState(selectedTask.priority);

    useEffect(() => {
        setChecked(selectedTask.priority);
    }, [selectedTask, setSelectedTask]);

    useEffect(() => {
        setSelectedTask((currentTask) => ({
            ...currentTask,
            priority: checked.toUpperCase(),
        }));
    }, [setSelectedTask, checked]);

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
                checked={checked.toLowerCase() === "high"}
                value="high"
                setChecked={setChecked}
            />
            <RadioButton
                id="medium_priority_info"
                name="priority"
                render={
                    <>
                        <FcMediumPriority /> Medium
                    </>
                }
                checked={checked.toLowerCase() === "medium"}
                value="medium"
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
                checked={checked.toLowerCase() === "low"}
                value="low"
                setChecked={setChecked}
            />
        </div>
    );
};

export default PriorityInfo;
