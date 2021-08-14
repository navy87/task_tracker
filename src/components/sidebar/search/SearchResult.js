import React, { useContext, useEffect, useState } from "react";
import { DataContext, FilterContext } from "../../../contexts/SidebarContext";

const SearchResult = () => {
    const {
        filteredPriorities,
        filteredStatuses,
        filteredKeywords,
        filteredPersons,
    } = useContext(FilterContext);
    const { tasks } = useContext(DataContext);

    const [allTasks, setAllTasks] = useState(0);
    const [activeTasks, setActiveTasks] = useState(0);

    useEffect(() => {
        const filteredTasks = tasks
            .filter((task) =>
                filteredPriorities.has(task.priority.toLowerCase())
            )
            .filter((task) => filteredStatuses.has(task.status.toLowerCase()))
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
                const filteredIds = [...filteredPersons].map(
                    (filteredPerson) => filteredPerson.id
                );
                const assigneeIds = [...task.assignees]
                    .map((taskPerson) => taskPerson.person.id)
                    .filter((id) => filteredIds.includes(id));
                return assigneeIds.length > 0;
            });
        setAllTasks(filteredTasks.length);
        setActiveTasks(
            filteredTasks.filter(
                (task) => task.status.toLowerCase() === "active"
            ).length
        );
    }, [
        tasks,
        filteredPriorities,
        filteredStatuses,
        setAllTasks,
        setActiveTasks,
        filteredKeywords,
        filteredPersons,
    ]);
    return (
        <div className="search_result">
            <p>{allTasks} Tasks Found</p>
            <p>{activeTasks} Active Tasks</p>
        </div>
    );
};

export default SearchResult;
