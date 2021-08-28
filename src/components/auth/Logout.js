import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/GlobalContext";

const Logout = () => {
    const { setAuth } = useContext(AuthContext);
    useEffect(() => {
        setAuth({ authenticated: false, token: null });
    });
    return <Redirect to={{ pathname: "/login" }} />;
};

export default Logout;
