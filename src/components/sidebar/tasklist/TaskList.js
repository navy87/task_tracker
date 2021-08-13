import React, { useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { DataContext, FilterContext } from "../../../contexts/SidebarContext";
import TaskItem from "./TaskItem";
import { compareTask } from "../../helpers/Helper";

const TaskList = () => {
    const { tasks } = useContext(DataContext);
    const { filteredPriorities, filteredStatuses, filteredKeywords } =
        useContext(FilterContext);
    const { taskSortOrder } = useContext(GlobalContext);

    return (
        <div className="task_list">
            {tasks
                .filter((task) =>
                    filteredPriorities.has(task.priority.toLowerCase())
                )
                .filter((task) =>
                    filteredStatuses.has(task.status.toLowerCase())
                )
                .filter((task) => {
                    const issue = task.issue.toLowerCase();
                    const description = task.description.toLowerCase();
                    const allText = issue + " " + description;
                    return allText.includes(filteredKeywords.toLowerCase());
                })
                .sort((task1, task2) =>
                    compareTask(task1, task2, taskSortOrder)
                )
                .map((task, index) => (
                    <TaskItem key={index} task={task} />
                ))}
        </div>
    );
};

export default TaskList;
