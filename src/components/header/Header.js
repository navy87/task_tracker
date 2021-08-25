import React from "react";
import { FcDepartment, FcPlanner } from "react-icons/fc";
import { RiLogoutCircleFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
    return (
        <header id="header">
            <div className="logo-container">
                <FcPlanner className="logo" />
                <h1>Task Planner</h1>
            </div>
            <ul className="user-info-list">
                <li className="no-btn">
                    <FcDepartment className="icon" />
                    IT Department
                </li>
                <li>
                    <FaUserCircle className="icon" /> John Doe
                </li>
                <li>
                    <RiLogoutCircleFill className="icon" /> Logout
                </li>
            </ul>
        </header>
    );
};

export default Header;
