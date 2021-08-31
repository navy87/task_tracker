import React from "react";
import {HiUserAdd} from "react-icons/hi";
import {CgPassword} from "react-icons/cg";
import {GiShieldDisabled} from "react-icons/gi";
import {RiLogoutCircleFill} from "react-icons/ri";
import DashboardButton from "./DashboardButton";
import {Si1Password} from "react-icons/all";
import {FcDepartment} from "react-icons/fc";

const Dashboard = ({match}) => {

    return (
        <div className="buttons-container">
            <DashboardButton
                icon={<HiUserAdd className="icon"/>}
                text="Create New User"
                to={`${match.url}/createUser`}
                type="create"
            />
            <DashboardButton
                icon={<FcDepartment className="icon"/>}
                text="Departments"
                to={`${match.url}/department`}
                type="create"
            />
            <DashboardButton
                icon={<Si1Password className="icon"/>}
                text="Change Superadmin Password"
                to={`${match.url}/changeSuperAdminPassword`}
                type="create"
            />
            <DashboardButton
                icon={<CgPassword className="icon"/>}
                text="Reset Password"
                to={`${match.url}/resetPassword`}
                type="reset"
            />
            <DashboardButton
                icon={<CgPassword className="icon"/>}
                text="Change Role"
                to={`${match.url}/changeRole`}
                type="deactivate"
            />
            <DashboardButton
                icon={<GiShieldDisabled className="icon"/>}
                text="Deactivate"
                to={`${match.url}/deactivateAccount`}
                type="deactivate"
            />
            <DashboardButton
                icon={<RiLogoutCircleFill className="icon"/>}
                text="Logout"
                to={`/logout`}
                type="logout"
            />
        </div>
    );
};

export default Dashboard;
