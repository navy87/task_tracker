import React from "react";
import "../../styles/main/main.css";
import TaskInfo from "./taskinfo/TaskInfo";
import TrackInfo from "./trackInfo/TrackInfo";

const Main = () => {
    return (
        <div id="main">
            <TaskInfo />
            <TrackInfo />
        </div>
    );
};

export default Main;
