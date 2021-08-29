import React, { useEffect, useState } from "react";

import { getTaskURL, GetToday } from "../../../helpers/Helper";

import TaskForm from "./TaskForm";
import ReactLoading from "react-loading";

const TaskInfo = ({ match }) => {
    const [selectedTask, setSelectedTask] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [emptyTask] = useState({
        id: 0,
        issue: "",
        description: "",
        addedDate: new Date().toISOString(),
        dueDate: GetToday(),
        status: "ACTIVE",
        priority: "HIGH",
        assignees: [],
    });
    const taskId = match.params.id;

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const url = getTaskURL(taskId);
            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    setSelectedTask(data);
                    setLoading(false);
                })
                .catch(console.error);
        };
        if (taskId.toLowerCase() === "new") {
            setSelectedTask(emptyTask);
            setLoading(false);
        } else {
            fetchData();
        }
    }, [taskId, setSelectedTask, emptyTask]);

    // console.log(selectedTask);
    return !loading ? (
        <TaskForm
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
            loading={loading}
        />
    ) : (
        <div className="loading-container">
            <ReactLoading />
        </div>
    );
};

export default TaskInfo;
