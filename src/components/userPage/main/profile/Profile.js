import React, {useEffect, useState} from "react";
import {FaUserCircle} from "react-icons/fa";
import {AiFillEdit, AiOutlineMail, AiOutlinePhone} from "react-icons/ai";
import {TiGroup} from "react-icons/ti";
import {BsPerson} from "react-icons/bs";
import {Link} from "react-router-dom";

const Profile = ({match}) => {
    const [user, setUser] = useState({})
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        setUser(user)
    }, [])
    return (
        <div id="id_profile_page">
            <div className="container">
                {/* <Link className="edit-link" to="/">
                    Edit
                </Link> */}
                <div className="title_pic_container">
                    <div className="pic-container">
                        <FaUserCircle className="profile_pic"/>
                        <Link to="/" className="changePhoto">
                            Change Photo
                        </Link>
                    </div>
                    <div className="dep_title">Manager</div>
                </div>
                <div className="detail name">
                    <BsPerson className="icon"/>
                    {user.fullName}
                </div>
                <div className="detail email">
                    <AiOutlineMail className="icon"/>
                    {user.email}
                </div>
                <div className="detail phone">
                    <AiOutlinePhone className="icon"/>
                    {user.phone}
                    <Link to="/" className="changePhone">
                        <AiFillEdit className="edit"/>
                        <div className="text">Change</div>
                    </Link>
                </div>
                <div className="detail department">
                    <TiGroup className="icon"/>
                    {user.departmentProfile}
                </div>
            </div>
        </div>
    );
};

export default Profile;
