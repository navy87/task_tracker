import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../contexts/SidebarContext";
import { getTaskExistsURL } from "../../../helpers/Helper";
import TaskInfo from "./taskinfo/TaskInfo";
import TrackInfo from "./trackInfo/TrackInfo";

const TaskTrackContainer = (props) => {
    const { setSelectedTask } = useContext(DataContext);
    const [existsOrNew, setExistsOrNew] = useState(false);
    const taskId = props.match.params.id;

    useEffect(() => {
        const fetchExists = async () => {
            const url = getTaskExistsURL(taskId);
            const res = await fetch(url);
            const data = await res.text();
            return data.toLowerCase() === "true";
        };

        if (taskId.toLowerCase() !== "new") {
            setSelectedTask({ id: parseInt(taskId) });
            fetchExists().then((res) => {
                setExistsOrNew(res);
            });
        } else {
            setSelectedTask({ id: "new" });
            setExistsOrNew(true);
        }
    }, [setSelectedTask, taskId]);

    return existsOrNew ? (
        <>
            <TaskInfo {...props} />
            <TrackInfo {...props} />
        </>
    ) : (
        <div>Task doesn't exist</div>
    );
};

export default TaskTrackContainer;
