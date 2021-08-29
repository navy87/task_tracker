import React from "react";
import TaskInfo from "./taskinfo/TaskInfo";
import TrackInfo from "./trackInfo/TrackInfo";
import LogoPage from "./logoPage/LogoPage";
import { Route, Switch } from "react-router-dom";

const Main = ({ match }) => {
    return (
        <div id="main">
            <Switch>
                <Route
                    path="/task/:id"
                    render={(props) => {
                        return (
                            <>
                                <TaskInfo {...props} />
                                <TrackInfo {...props} />
                            </>
                        );
                    }}
                />
                <Route path="/" exact component={LogoPage} />
            </Switch>
        </div>
    );
};

export default Main;
