import React from "react";
import {FcPlanner} from "react-icons/fc";
import "../../styles/login/login.css";
import {Route, Switch} from "react-router-dom";
import LoginForm from "./LoginForm";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

const LoginPageContainer = ({match}) => {
    return (
        <div id="id_login_page">
            <div className="container">
                <div className="logo-container">
                    <FcPlanner className="logo"/>
                    <h1>Task Tracker</h1>
                </div>

                <Switch>
                    <Route path={`${match.url}/`} exact component={LoginForm}/>
                    <Route
                        path={`${match.url}/forgotPassword`}
                        component={ForgotPassword}
                    />
                    <Route
                        path={`${match.url}/resetPassword`}
                        component={ResetPassword}
                    />
                </Switch>
            </div>
        </div>
    );
};

export default LoginPageContainer;
