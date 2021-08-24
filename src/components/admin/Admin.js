import React from "react";
import "../../styles/admin/admin.css"; // This Import must be last for some reason
import Dashboard from "./Dashboard";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import CreateUser from "./CreateUser";
import ResetPassword from "./ResetPassword";
import DeactivateAccount from "./DeactivateAccount";

const Admin = ({ match }) => {
    return (
        <Router>
            <div id="adminPage">
                <header>
                    <h1>Admin Panel</h1>
                </header>
                <main>
                    <Switch>
                        <Route
                            path={`${match.url}/`}
                            exact
                            component={Dashboard}
                        />
                        <Route
                            path={`${match.url}/createUser`}
                            exact
                            component={CreateUser}
                        />
                        <Route
                            path={`${match.url}/resetPassword`}
                            exact
                            component={ResetPassword}
                        />
                        <Route
                            path={`${match.url}/deactivateAccount`}
                            exact
                            component={DeactivateAccount}
                        />
                    </Switch>
                </main>
            </div>
        </Router>
    );
};

export default Admin;
