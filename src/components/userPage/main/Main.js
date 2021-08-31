import React from "react";
import LogoPage from "./logoPage/LogoPage";
import {Route, Switch} from "react-router-dom";
import TaskTrackContainer from "./TaskTrackContainer";
import Profile from "./profile/Profile";

const Main = ({match}) => {
    return (
        <div id="main">
            <Switch>
                <Route
                    path={`/profile`}
                    component={Profile}
                />
                <Route path="/task/:id" component={TaskTrackContainer}/>
                <Route path="/" exact component={LogoPage}/>
            </Switch>
        </div>
    );
};

export default Main;
