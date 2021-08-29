import React, { useContext, useEffect } from "react";
import { DataContext } from "../../../contexts/SidebarContext";
import TaskInfo from "./taskinfo/TaskInfo";
import TrackInfo from "./trackInfo/TrackInfo";

const TaskTrackContainer = (props) => {
    const { setSelectedTask } = useContext(DataContext);
    const taskId = props.match.params.id;

    useEffect(() => {
        if (taskId.toLowerCase() !== "new") {
            setSelectedTask({ id: parseInt(taskId) });
        } else {
            setSelectedTask({ id: "new" });
        }
        console.log("set");
    }, [setSelectedTask, taskId]);

    return (
        <>
            <TaskInfo {...props} />
            <TrackInfo {...props} />
        </>
    );
};

export default TaskTrackContainer;
