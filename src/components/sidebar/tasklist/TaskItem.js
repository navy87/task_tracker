import React from "react";
import {
    FcLowPriority,
    FcMediumPriority,
    FcHighPriority,
} from "react-icons/fc";

import { BsCalendar } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { Capitalize } from "../../helpers/Helper";

const priorityMap = {
    low: {
        text: "Low Priority",
        icon: <FcLowPriority className="icon" />,
    },
    medium: {
        text: "Medium Priority",
        icon: <FcMediumPriority className="icon" />,
    },
    high: {
        text: "High Priority",
        icon: <FcHighPriority className="icon" />,
    },
};

const TaskItem = ({
    name,
    description,
    priority,
    dueDate,
    persons,
    status,
}) => {
    // console.log("Assignees: ");
    // console.log(persons);
    let displayedName = "";
    if (persons && persons.length > 0) {
        const leaders = persons.filter(
            (taskPerson) => taskPerson.person.leader
        );
        if (leaders > 0) {
            displayedName = leaders[0];
        } else if (persons) {
            displayedName = persons[0];
        }
        displayedName = displayedName.person.name;
    }

    return (
        <div className="task_item" onClick={() => alert("Hello")}>
            <div className="task_head">
                <h3>{name}</h3>
                <span className={`status ${status.toLowerCase()}`}>
                    {Capitalize(status)}
                </span>
            </div>
            <p className="task_description">{description}</p>
            <div className="task_details">
                <div className="priority">
                    {priorityMap[priority].icon} {priorityMap[priority].text}
                </div>

                <div className="date">
                    <BsCalendar className="icon" /> {dueDate}
                </div>

                <div className="assignees">
                    <IoIosPeople className="icon" />
                    <b className={displayedName || "warning"}>
                        {displayedName ? displayedName : "Not Assigned"}
                    </b>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
