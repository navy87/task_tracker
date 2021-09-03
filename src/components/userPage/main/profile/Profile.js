import React from "react";
import { Route, Switch} from "react-router-dom";
import ShowProfile from "./ShowProfile";
import EditProfile from "./EditProfile";
import PasswordChange from "./PasswordChange";

const Profile = ({match}) => {
    return (
        <div id="id_profile_page">
            <Switch>
                <Route path={`${match.url}/passwordChange`} component={PasswordChange}/>
                <Route path={`${match.url}/edit`} component={EditProfile}/>
                <Route path={`${match.url}/`} component={ShowProfile}/>
            </Switch>
        </div>
    );
};

export default Profile;
