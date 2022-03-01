import React, { useContext, useEffect } from "react";
import { FcPlanner } from "react-icons/fc";
import "../../styles/login/login.css";
import { Navigate, Outlet, Route, Routes, useMatch } from "react-router-dom";
import LoginForm from "./LoginForm";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import { GlobalContext } from "../../contexts/GlobalContext";

const LoginPageContainer = () => {
    const token = localStorage.getItem("token");
    const { setDocumentSubtitle } = useContext(GlobalContext);
    const match = useMatch("/login/*");
    console.log(match);
    // console.log(`${match.pathname}/`);
    useEffect(() => {
        setDocumentSubtitle("Login");
    });

    if (token) {
        return <Navigate to="/logout" />;
    }

    return (
        <div id="id_login_page">
            <div className="container">
                <div className="logo-container">
                    <FcPlanner className="logo" />
                    <h1>Task Tracker</h1>
                </div>
                <Outlet />
                {/* <Routes>
                    <Route
                        path={`${match.pathname}/`}
                        element={<LoginForm />}
                    />
                    <Route
                        path={`${match.pathname}/forgotPassword`}
                        element={<ForgotPassword />}
                    />
                    <Route
                        path={`${match.pathname}/resetPassword`}
                        element={<ResetPassword />}
                    />
                </Routes> */}
            </div>
        </div>
    );
};

export default LoginPageContainer;
