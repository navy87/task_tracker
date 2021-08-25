import React, { useContext } from "react";
import TaskInfo from "./taskinfo/TaskInfo";
import TrackInfo from "./trackInfo/TrackInfo";
import LogoPage from "./logoPage/LogoPage";
import { DataContext } from "../../contexts/SidebarContext";

const Main = () => {
    const { selectedTask } = useContext(DataContext);

    return (
        <div id="main">
            {selectedTask ? (
                <>
                    <TaskInfo />
                    <TrackInfo />
                </>
            ) : (
                <LogoPage />
            )}
        </div>
    );
};

export default Main;
