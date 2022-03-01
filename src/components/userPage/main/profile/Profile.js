import React from "react";
import { Route, Routes } from "react-router-dom";
import ShowProfile from "./ShowProfile";
import EditProfile from "./EditProfile";
import PasswordChange from "./PasswordChange";

const Profile = ({ match }) => {
    return (
        <div id="id_profile_page">
            <Routes>
                <Route
                    path={`${match.url}/passwordChange`}
                    element={<PasswordChange />}
                />
                <Route path={`${match.url}/edit`} element={<EditProfile />} />
                <Route path={`${match.url}/`} element={<ShowProfile />} />
            </Routes>
        </div>
    );
};

export default Profile;
