import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import "../../styles/main/main.css";
import TaskInfo from "./taskinfo/TaskInfo";
import TrackInfo from "./trackInfo/TrackInfo";

const Main = () => {
    const { selectedTask } = useContext(GlobalContext);

    return (
        <div id="main">
            {selectedTask ? (
                <>
                    <TaskInfo />
                    <TrackInfo />
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Main;
