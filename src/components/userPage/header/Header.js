import React, { useEffect, useState} from "react";
import { FcDepartment, FcPlanner } from "react-icons/fc";
import { RiLogoutCircleFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")))
    }, [])

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
                    {user.department || "Unspecified"}
                </div>
                <Link className="list-item" to="/profile">
                    <FaUserCircle className="icon" /> {user.fullName}
                </Link>
                <Link className="list-item" to="/logout">
                    <RiLogoutCircleFill className="icon" /> Logout
                </Link>
            </div>
        </header>
    );
};

export default Header;
