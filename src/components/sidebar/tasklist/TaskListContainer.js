import React from "react";
import TaskList from "./TaskList";
import Buttons from "./Buttons";

const TaskListContainer = () => {
    return (
        <div className="task_list_container">
            <Buttons />
            <TaskList />
        </div>
    );
};

export default TaskListContainer;
