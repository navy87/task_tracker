import React, { useContext } from "react";
import { DataContext, FilterContext } from "../../../contexts/SidebarContext";
import TaskItem from "./TaskItem";

const TaskList = () => {
    const { tasks } = useContext(DataContext);
    const { filteredPriorities, filteredStatuses } = useContext(FilterContext);

    // useEffect(() => {
    //     console.log("TaskList: " + JSON.stringify(filteredPriorities));
    // }, [filteredPriorities]);

    return (
        <div className="task_list">
            {tasks
                .filter((task) =>
                    filteredPriorities.has(task.priority.toLowerCase())
                )
                .filter((task) =>
                    filteredStatuses.has(task.status.toLowerCase())
                )
                .map((task, index) => (
                    <TaskItem
                        key={index}
                        name={task.issue}
                        description={task.description}
                        dueDate={task.dueDate}
                        persons={task.assignees}
                        priority={task.priority.toLowerCase()}
                        status={task.status}
                    />
                ))}
        </div>
    );
};

export default TaskList;
