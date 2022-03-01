import React, { useContext } from "react";
import {
    DataContext,
    FilterContext,
} from "../../../../contexts/SidebarContext";
import TaskItem from "./TaskItem";
import { compareTask } from "../../../../helpers/Helper";

const TaskList = () => {
    const { tasks } = useContext(DataContext);

    const {
        filteredPriorities,
        filteredStatuses,
        filteredKeywords,
        filteredPersons,
    } = useContext(FilterContext);
    const { taskSortOrder } = useContext(DataContext);

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
                    return (issue + " " + description).includes(
                        filteredKeywords.toLowerCase()
                    );
                })
                .filter((task) => {
                    if ([...filteredPersons].length === 0) {
                        return true;
                    }
                    console.log("Filtered Ids:");
                    const filteredIds = [...filteredPersons].map(
                        (filteredPerson) => filteredPerson.id
                    );
                    console.log(filteredIds);
                    console.log("Assignee Ids: ");
                    console.log([...task.assignees]);
                    const assigneeIds = [...task.assignees]
                        .map((taskPerson) => taskPerson.profile.id)
                        .filter((id) => filteredIds.includes(id));
                    return assigneeIds.length > 0;
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
