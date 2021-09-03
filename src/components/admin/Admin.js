import React from "react";

import Dashboard from "./Dashboard";
import { Route, Switch} from "react-router-dom";
import CreateUser from "./createUser/CreateUser";
import ResetPasswordAdmin from "./ResetPasswordAdmin";
import ActivateDeactivateAccount from "./ActivateDeactivateAccount";
import Department from "./department/Department";

import ChangeRole from "./ChangeRole";
import Header from "../userPage/header/Header";
// This Import must be last for some reason
import "../../styles/admin/admin.css";

const Admin = ({match}) => {
    return (
        <div id="adminPage">
            {/*<header>*/}
            {/*    <Link to={"/admin"}>*/}
            {/*        <h1>Admin Panel</h1>*/}
            {/*    </Link>*/}
            {/*</header>*/}
            <Header admin={true} />
            <main>
                <Switch>
                    <Route
                        path={`${match.url}/createUser`}
                        component={CreateUser}
                    />
                    <Route
                        path={`${match.url}/department/`}
                        component={Department}
                    />
                    <Route
                        path={`${match.url}/changeRole/`}
                        component={ChangeRole}
                    />
                    <Route
                        path={`${match.url}/resetPassword`}
                        component={ResetPasswordAdmin}
                    />
                    <Route
                        path={`${match.url}/deactivateAccount`}
                        render={props => <ActivateDeactivateAccount {...props} deactivate={true}/>}
                    />
                    <Route
                        path={`${match.url}/activateAccount`}
                        render={props => <ActivateDeactivateAccount {...props} activate={true}/>}
                    />

                    <Route path={`${match.url}/`} exact component={Dashboard}/>
                </Switch>
            </main>
        </div>
    );
};

export default Admin;
