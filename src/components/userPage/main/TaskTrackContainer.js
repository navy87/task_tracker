import React, {useContext, useEffect, useState} from "react";
import {DataContext} from "../../../contexts/SidebarContext";
import {getTaskExistsURL} from "../../../helpers/Helper";
import TaskInfo from "./taskinfo/TaskInfo";
import TrackInfo from "./trackInfo/TrackInfo";
import axios from "axios";

const TaskTrackContainer = (props) => {
    const {setSelectedTask} = useContext(DataContext);
    const [existsOrNew, setExistsOrNew] = useState(false);
    const taskId = props.match.params.id;

    useEffect(() => {
        const fetchExists = async () => {
            try {
                const url = getTaskExistsURL(taskId);
                const res = await axios.get(url)
                return res.data; // Boolean
            } catch (error) {
                console.error(error)
            }
        };

        if (taskId.toLowerCase() !== "new") {
            setSelectedTask({id: parseInt(taskId)});
            fetchExists().then((res) => {
                setExistsOrNew(res);
            });
        } else {
            setSelectedTask({id: null});
            setExistsOrNew(true);
        }
    }, [setSelectedTask, taskId]);

    return existsOrNew ? (
        <>
            <TaskInfo {...props} />
            <TrackInfo {...props} />
        </>
    ) : (
        <div className={"error-page"}>
            <h1>Wrong Address.</h1>
            <p className={"subtitle"}>The task you are looking for doesn't exist or you are not authorized to look it up.</p>
            <p className={"disclaimer"}>If you think this shouldn't happen, please refresh the page (F5 or Ctrl-R) and try again.
                However if the problem persists, please make sure to contact your IT Department</p>
            <a className={"refresh-button"} href={props.match.url}>
                Refresh
            </a>
        </div>
    );
};

export default TaskTrackContainer;
