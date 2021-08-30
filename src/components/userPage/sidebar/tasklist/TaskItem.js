import React, { useContext } from "react";
import {
    FcLowPriority,
    FcMediumPriority,
    FcHighPriority,
} from "react-icons/fc";

import { BsCalendar } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { Capitalize } from "../../../../helpers/Helper";
import { DataContext } from "../../../../contexts/SidebarContext";
import { Link } from "react-router-dom";

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

const TaskItem = ({ task }) => {
    const { selectedTask } = useContext(DataContext);
    const { issue, description, dueDate, assignees, status } = task;
    const priority = task.priority.toLowerCase();

    let displayedName = "";
    if (assignees && assignees.length > 0) {
        const leaders = assignees.filter((taskPerson) => taskPerson.leader);
        if (leaders.length > 0) {
            displayedName = leaders[0];
        } else {
            displayedName = assignees[0];
        }
        displayedName = displayedName.profile
            ? displayedName.profile.fullName
            : "";
    }

    return (
        <Link
            className={`task_item ${
                selectedTask && selectedTask.id === task.id && "selected"
            }`}
            to={`/task/${task.id}`}
        >
            <div className="task_head">
                <h3>{issue}</h3>
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
        </Link>
    );
};

export default TaskItem;
