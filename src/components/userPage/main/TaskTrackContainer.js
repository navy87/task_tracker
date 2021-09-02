import React, {useContext, useEffect, useState} from "react";
import {DataContext} from "../../../contexts/SidebarContext";
import {getTaskExistsURL} from "../../../helpers/Helper";
import TaskInfo from "./taskinfo/TaskInfo";
import TrackInfo from "./trackInfo/TrackInfo";
import axios from "axios";
import ReactLoading from "react-loading";

const TaskTrackContainer = (props) => {
    const {setSelectedTask} = useContext(DataContext);
    const [existsOrNew, setExistsOrNew] = useState(true);
    const [loading, setLoading] = useState(true);
    const taskId = props.match.params.id;

    useEffect(() => {
        setLoading(true)
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
                setLoading(false)
            });
        } else {
            setSelectedTask({id: null});
            setExistsOrNew(true);
            setLoading(false)
        }
    }, [setSelectedTask, taskId]);

    return !loading ? (
        existsOrNew ? (
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
        )
    ) : <div className={"loading-container"} >
        <ReactLoading type={"spokes"} className={"loading"} />
    </div>;
};

export default TaskTrackContainer;
