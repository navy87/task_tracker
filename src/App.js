import React, { useEffect, useState } from "react";

import { Toaster } from "react-hot-toast";
import ReactTooltip from "react-tooltip";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { GlobalContext } from "./contexts/GlobalContext";
import Admin from "./components/admin/Admin";
import LoginPageContainer from "./components/auth/LoginPageContainer";
import ParticlesBackground from "./components/particles/ParticlesBackground";
import UserPage from "./components/userPage/UserPage";

import "./styles/index/App.css"; // This Import must be last for some reason
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Logout from "./components/auth/Logout";
import axios from "axios";
import { getCurrentUserURL } from "./helpers/Helper";
import LoginForm from "./components/auth/LoginForm";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import CreateUser from "./components/admin/createUser/CreateUser";
import Department from "./components/admin/department/Department";
import ChangeRole from "./components/admin/ChangeRole";
import ResetPasswordAdmin from "./components/admin/ResetPasswordAdmin";
import ActivateDeactivateAccount from "./components/admin/ActivateDeactivateAccount";
import Dashboard from "./components/admin/Dashboard";
import Main from "./components/userPage/main/Main";
import Profile from "./components/userPage/main/profile/Profile";
import TaskTrackContainer from "./components/userPage/main/TaskTrackContainer";
import LogoPage from "./components/userPage/main/logoPage/LogoPage";

const getAnimation = () => {
    const value = localStorage.getItem("animation");
    return value === "true";
};

function App() {
    const [dialog, setDialog] = useState();
    const [animationBackground, setAnimationBackground] = useState(
        getAnimation()
    );
    const [userRefreshed, setUserRefreshed] = useState(true);
    const [documentSubtitle, setDocumentSubtitle] = useState("");

    useEffect(() => {
        localStorage.setItem("animation", animationBackground.toString());
    }, [animationBackground]);

    useEffect(() => {
        if (documentSubtitle) {
            document.title = documentSubtitle + " | Task Tracker";
        }
    }, [documentSubtitle]);

    const refreshSavedUser = async () => {
        if (localStorage.getItem("token")) {
            try {
                const response = await axios.get(getCurrentUserURL());
                const user = response.data;
                localStorage.setItem("user", JSON.stringify(user));
                setUserRefreshed((current) => !current);
            } catch (e) {
                console.error(e);
            }
        }
    };

    useEffect(() => {
        refreshSavedUser().then(null);
    }, []);

    const globalContextValues = {
        dialog,
        setDialog,
        animationBackground,
        setAnimationBackground,
        refreshSavedUser,
        userRefreshed,
        setDocumentSubtitle,
    };

    return (
        <Router>
            <GlobalContext.Provider value={globalContextValues}>
                <div className="App">
                    {animationBackground && <ParticlesBackground />}
                    {dialog || ""}
                    <Toaster />
                    <ReactTooltip effect="solid" />
                    <Routes>
                        <Route
                            element={<ProtectedRoute requiredRole={"USER"} />}
                        >
                            <Route path="/" element={<UserPage />}>
                                <Route path="" element={<Main />}>
                                    <Route
                                        path={`/profile`}
                                        element={<Profile />}
                                    />
                                    <Route
                                        path="/task/:id"
                                        element={<TaskTrackContainer />}
                                    />
                                    <Route
                                        path="/"
                                        element={<LogoPage />}
                                    />
                                </Route>
                            </Route>
                        </Route>
                        <Route path="/login/*" element={<LoginPageContainer />}>
                            <Route path={``} element={<LoginForm />} />
                            <Route
                                path={`forgotPassword`}
                                element={<ForgotPassword />}
                            />
                            <Route
                                path={`resetPassword`}
                                element={<ResetPassword />}
                            />
                        </Route>
                        <Route
                            path="/admin/*"
                            element={<ProtectedRoute requiredRole={"ADMIN"} />}
                        >
                            <Route path="" element={<Admin />}>
                                <Route
                                    path={`createUser`}
                                    element={<CreateUser />}
                                />
                                <Route
                                    path={`department`}
                                    element={<Department />}
                                />
                                <Route
                                    path={`changeRole`}
                                    element={<ChangeRole />}
                                />
                                <Route
                                    path={`resetPassword`}
                                    element={<ResetPasswordAdmin />}
                                />
                                <Route
                                    path={`deactivateAccount`}
                                    element={
                                        <ActivateDeactivateAccount
                                            deactivate={true}
                                        />
                                    }
                                />
                                <Route
                                    path={`activateAccount`}
                                    element={
                                        <ActivateDeactivateAccount
                                            activate={true}
                                        />
                                    }
                                />

                                <Route path="" element={<Dashboard />} />
                            </Route>
                        </Route>
                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </div>
            </GlobalContext.Provider>
        </Router>
    );
}

export default App;
