import React from "react";
import LogoPage from "./logoPage/LogoPage";
import { Route, Routes } from "react-router-dom";
import TaskTrackContainer from "./TaskTrackContainer";
import Profile from "./profile/Profile";

const Main = ({ match }) => {
    return (
        <div id="main">
            <Routes>
                <Route path={`/profile`} element={<Profile />} />
                <Route path="/task/:id" element={<TaskTrackContainer />} />
                <Route path="/" exact element={<LogoPage />} />
            </Routes>
        </div>
    );
};

export default Main;
