import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Logout = () => {
    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    });
    return <Navigate to={{ pathname: "/login" }} />;
};

export default Logout;
