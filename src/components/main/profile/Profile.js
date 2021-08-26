import React, { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { TiGroup } from "react-icons/ti";
import { BsPerson } from "react-icons/bs";
import { Link } from "react-router-dom";

const Profile = ({ match }) => {
    useEffect(() => {
        console.log(match);
    });
    return (
        <div id="id_profile_page">
            <div className="container">
                <Link className="edit-link" to="/">
                    Edit
                </Link>
                <div className="title_pic_container">
                    <FaUserCircle className="profile_pic" />
                    <p className="dep_title">Manager</p>
                </div>
                <p className="detail name">
                    <BsPerson className="icon" />
                    Yahya Fati
                </p>
                <p className="detail email">
                    <AiOutlineMail className="icon" />
                    yahyafati123@gmail.com
                </p>
                <p className="detail phone">
                    <AiOutlinePhone className="icon" />
                    +251925240618
                </p>
                <p className="detail department">
                    <TiGroup className="icon" />
                    IT Department
                </p>
            </div>
        </div>
    );
};

export default Profile;
