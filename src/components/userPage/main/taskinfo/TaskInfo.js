import React, { useEffect, useState} from "react";

import { getTaskURL, GetToday } from "../../../../helpers/Helper";

import TaskForm from "./TaskForm";
import ReactLoading from "react-loading";
import axios from "axios";

const TaskInfo = ({ match }) => {
    const [selectedTask, setSelectedTask] = useState(undefined);
    // const [loading, setLoading] = useState(true);

    const STATUSES = {loading: 0, loaded:1, forbidden: 2}
    Object.freeze(STATUSES)

    const [status, setStatus] = useState(STATUSES.loading)

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
        setStatus(STATUSES.loading);
        const fetchData = async () => {
            const url = getTaskURL(taskId);
            try {
                const res = await axios(url);
                const data = res.data;
                if (res.status === 200) {
                    setSelectedTask(data);
                    setStatus(STATUSES.loaded)
                } else if (res.status === 403){
                    setStatus(STATUSES.forbidden)
                }
                return data
            } catch (e) {
                console.error(e)
                return e
            }
        };
        if (taskId.toLowerCase() === "new") {
            setSelectedTask(emptyTask);
            setStatus(STATUSES.loaded);
        } else {
            fetchData().then(null)
        }
    }, [taskId, setSelectedTask, emptyTask, setStatus,
            STATUSES.loading, STATUSES.loaded, STATUSES.forbidden]);

    const notLoadedSelect = () => {
        return status === STATUSES.loading ? (
            <div className="loading-container">
                <ReactLoading />
            </div>
        ) : (
            <div>Forbidden</div>
        );
    };

    return status === STATUSES.loaded ? (
        <TaskForm
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
        />
    ) : (
        notLoadedSelect()
    );
};

export default TaskInfo;
