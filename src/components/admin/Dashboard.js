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
                color="navy"
            />
            <DashboardButton
                icon={<FcDepartment className="icon"/>}
                text="Departments"
                to={`${match.url}/department`}
                color="green"
            />
            <DashboardButton
                icon={<Si1Password className="icon"/>}
                text="Change Superadmin Password"
                to={`${match.url}/changeSuperAdminPassword`}
                color="darkgray"
            />
            <DashboardButton
                icon={<CgPassword className="icon"/>}
                text="Reset Password"
                to={`${match.url}/resetPassword`}
                color={"darkred"}
            />
            <DashboardButton
                icon={<CgPassword className="icon"/>}
                text="Change Role"
                to={`${match.url}/changeRole`}
                color={"darkblue"}
            />
            <DashboardButton
                icon={<GiShieldDisabled className="icon"/>}
                text="Activate"
                to={`${match.url}/activateAccount`}
                color={"darkcyan"}
            />
            <DashboardButton
                icon={<GiShieldDisabled className="icon"/>}
                text="Deactivate"
                to={`${match.url}/deactivateAccount`}
                color={"brown"}
            />
            <DashboardButton
                icon={<RiLogoutCircleFill className="icon"/>}
                text="Logout"
                to={`/logout`}
                color={"#444"}
            />
        </div>
    );
};

export default Dashboard;
