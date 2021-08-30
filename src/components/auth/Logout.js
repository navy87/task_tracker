import React, {useEffect} from "react";
import {Redirect} from "react-router-dom";

const Logout = () => {

    useEffect(() => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
    });
    return <Redirect to={{pathname: "/login"}}/>;
};

export default Logout;
