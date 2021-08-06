import React, { useContext, useEffect } from "react";
import { DataContext, FilterContext } from "../../../contexts/SidebarContext";
import TaskItem from "./TaskItem";

const TaskList = () => {
    const { tasks } = useContext(DataContext);
    const { filteredPriorities } = useContext(FilterContext);
    

    useEffect(() => {
        console.log("TaskList: " + JSON.stringify(filteredPriorities));
    }, [filteredPriorities]);

    return (
        <div className="task_list">
            {tasks
                .filter((task) => filteredPriorities.has(task.priority))
                .map((task) => {
                    return (
                        <TaskItem
                            name={task.name}
                            description={task.description}
                            dueDate={task.dueDate}
                            persons={task.persons}
                            priority={task.priority}
                            status={task.status}
                        />
                    );
                })}
        </div>
    );
};

export default TaskList;
