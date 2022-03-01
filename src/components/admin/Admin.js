import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../userPage/header/Header";

// This Import must be last for some reason
import "../../styles/admin/admin.css";

const Admin = ({ match }) => {
    return (
        <div id="adminPage">
            {/*<header>*/}
            {/*    <Link to={"/admin"}>*/}
            {/*        <h1>Admin Panel</h1>*/}
            {/*    </Link>*/}
            {/*</header>*/}
            <Header admin={true} />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Admin;
