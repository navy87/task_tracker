import React, { useContext, useEffect, useState } from "react";
import { DataContext, FilterContext } from "../../../contexts/SidebarContext";

const SearchResult = () => {
    const { filteredPriorities, filteredStatuses } = useContext(FilterContext);
    const { tasks } = useContext(DataContext);

    const [allTasks, setAllTasks] = useState(tasks.length);
    const [activeTasks, setActiveTasks] = useState(tasks.length);

    useEffect(() => {
        const filteredTasks = tasks
            .filter((task) =>
                filteredPriorities.has(task.priority.toLowerCase())
            )
            .filter((task) => filteredStatuses.has(task.status.toLowerCase()));
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
    ]);
    return (
        <div className="search_result">
            <p>{allTasks} Tasks Found</p>
            <p>{activeTasks} Active Tasks</p>
        </div>
    );
};

export default SearchResult;
