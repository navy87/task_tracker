import React, { useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { DataContext, FilterContext } from "../../../contexts/SidebarContext";
import TaskItem from "./TaskItem";
import { compareTask } from "../../helpers/Helper";

const TaskList = () => {
    const { tasks } = useContext(DataContext);
    const { filteredPriorities, filteredStatuses } = useContext(FilterContext);
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
                .sort((task1, task2) =>
                    compareTask(task1, task2, taskSortOrder)
                )
                .map((task, index) => (
                    <TaskItem
                        key={index}
                        task={task}
                        // name={task.issue}
                        // description={task.description}
                        // dueDate={task.dueDate}
                        // persons={task.assignees}
                        // priority={task.priority.toLowerCase()}
                        // status={task.status}
                    />
                ))}
        </div>
    );
};

export default TaskList;
