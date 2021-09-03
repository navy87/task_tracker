import React, {useContext, useEffect, useState} from "react";
import {FcDepartment, FcPlanner} from "react-icons/fc";
import {RiAdminFill, RiLogoutCircleFill} from "react-icons/ri";
import {FaUserCircle} from "react-icons/fa";
import {Link} from "react-router-dom";
import {GlobalContext} from "../../../contexts/GlobalContext";
import {AiFillHome} from "react-icons/all";

const Header = ({admin}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    const {animationBackground, setAnimationBackground} = useContext(GlobalContext)

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")))
    }, [])

    return (
        <header id="header">
            <Link to={admin ? "/admin" : "/"}>
                <div className="logo-container">
                    <FcPlanner className="logo"/>
                    <h1>
                        Task Planner{admin && " | "}{admin && <span className={"admin"}>Admin Panel</span>}
                    </h1>
                </div>
            </Link>
            <div className="user-info-list">
                <div className={"list-item"}>
                    <label htmlFor={"id_animation_check"}>Animation</label>
                    <input
                        id={"id_animation_check"}
                        type={"checkbox"}
                        value={animationBackground}
                        checked={animationBackground}
                        onChange={event => {
                            console.log(event.target.checked)
                            setAnimationBackground(event.target.checked)
                        }}
                    />
                </div>
                {user.role.name === "ADMIN" &&
                <Link className="list-item" to={admin ? "/" : "/admin"}>
                    {admin ?
                        <>
                            <AiFillHome className={"icon"} /> Go To Home
                        </> :
                        <>
                            <RiAdminFill className={"icon"} /> Go To Admin Panel
                        </>
                    }
                </Link>
                }
                {
                    user.role.name !== "SUPER_ADMIN" &&
                    <div className="no-btn">
                        <FcDepartment className="icon"/>
                        {user.department.name}
                    </div>
                }
                <Link className="list-item" to="/profile">
                    <FaUserCircle className="icon"/> {user.fullName}
                </Link>
                <Link className="list-item" to="/logout">
                    <RiLogoutCircleFill className="icon"/> Logout
                </Link>
            </div>
        </header>
    );
};

export default Header;
