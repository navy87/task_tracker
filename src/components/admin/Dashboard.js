import React from "react";
import { HiUserAdd } from "react-icons/hi";
import { CgPassword } from "react-icons/cg";
import { GiShieldDisabled } from "react-icons/gi";
import { RiLogoutCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Dashboard = ({ match }) => {
    return (
        <div className="buttons-container">
            <Link className="button-link" to={`${match.url}/createUser`}>
                <div className="dashboard-button create">
                    <HiUserAdd className="icon" />
                    Create New User
                </div>
            </Link>
            <Link className="button-link" to={`${match.url}/resetPassword`}>
                <div className="dashboard-button reset">
                    <CgPassword className="icon" />
                    Reset Password
                </div>
            </Link>
            <Link className="button-link" to={`${match.url}/deactivateAccount`}>
                <div className="dashboard-button deactivate">
                    <GiShieldDisabled className="icon" />
                    Deactivate
                </div>
            </Link>
            <Link className="button-link" to={`${match.url}/logout`}>
                <div className="dashboard-button logout">
                    <RiLogoutCircleFill className="icon" />
                    Logout
                </div>
            </Link>
        </div>
    );
};

export default Dashboard;
