import React, {useContext} from "react";
import { FcDepartment, FcPlanner } from "react-icons/fc";
import { RiLogoutCircleFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import {AuthContext} from "../../../contexts/GlobalContext";

const Header = () => {
    const { auth } = useContext(AuthContext)

    return (
        <header id="header">
            <Link to="/">
                <div className="logo-container">
                    <FcPlanner className="logo" />
                    <h1>Task Planner</h1>
                </div>
            </Link>
            <div className="user-info-list">
                <div className="no-btn">
                    <FcDepartment className="icon" />
                    {auth.user.department || "Unspecified"}
                </div>
                <Link className="list-item" to="/profile">
                    <FaUserCircle className="icon" /> {auth.user.fullName}
                </Link>
                <Link className="list-item" to="/logout">
                    <RiLogoutCircleFill className="icon" /> Logout
                </Link>
            </div>
        </header>
    );
};

export default Header;
