import React from "react";

import Dashboard from "./Dashboard";
import {Link, Route, Switch} from "react-router-dom";
import CreateUser from "./CreateUser";
import ResetPasswordAdmin from "./ResetPasswordAdmin";
import DeactivateAccount from "./DeactivateAccount";
import Department from "./department/Department";

import "../../styles/admin/admin.css"; // This Import must be last for some reason
const Admin = ({match}) => {
    return (
        <div id="adminPage">
            <header>
                <Link to={"/admin"}>
                    <h1>Admin Panel</h1>
                </Link>
            </header>
            <main>
                <Switch>
                    <Route
                        path={`${match.url}/createUser`}
                        component={CreateUser}
                    />
                    {/* Department */}
                    <Route
                        path={`${match.url}/department/`}
                        component={Department}
                    />

                    <Route
                        path={`${match.url}/resetPassword`}
                        component={ResetPasswordAdmin}
                    />
                    <Route
                        path={`${match.url}/deactivateAccount`}
                        component={DeactivateAccount}
                    />

                    <Route path={`${match.url}/`} exact component={Dashboard}/>
                </Switch>
            </main>
        </div>
    );
};

export default Admin;
