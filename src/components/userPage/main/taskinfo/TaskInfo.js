import React, { useEffect, useState} from "react";

import { getTaskURL, GetToday } from "../../../../helpers/Helper";

import TaskForm from "./TaskForm";
import ReactLoading from "react-loading";
import axios from "axios";

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
            try {
                const res = await axios(url);
                const data = res.data;
                setSelectedTask(data);
                setLoading(false)
                return data
            } catch (e) {
                console.error(e)
                return e
            }
        };
        if (taskId.toLowerCase() === "new") {
            setSelectedTask(emptyTask);
            setLoading(false);
        } else {
            fetchData().then(console.log)
        }
    }, [taskId, setSelectedTask, emptyTask,]);

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
