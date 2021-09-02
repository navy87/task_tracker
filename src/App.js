import React, {useEffect, useState} from "react";

import {Toaster} from "react-hot-toast";
import ReactTooltip from "react-tooltip";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {GlobalContext} from "./contexts/GlobalContext";
import Admin from "./components/admin/Admin";
import LoginPageContainer from "./components/auth/LoginPageContainer";
import ParticlesBackground from "./components/particles/ParticlesBackground";
import UserPage from "./components/userPage/UserPage";

import "styles/index/App.css"; // This Import must be last for some reason
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Logout from "./components/auth/Logout";
import axios from "axios";
import {getCurrentUserURL} from "./helpers/Helper";

function App() {
    const [dialog, setDialog] = useState();
    const [animationBackground, setAnimationBackground] = useState(true)

    const globalContextValues = {
        dialog,
        setDialog,
        animationBackground, setAnimationBackground
    };

    const refreshUser = async () => {
        if (localStorage.getItem("token")) {
            try {
                const response = await axios.get(getCurrentUserURL());
                const user = response.data;
                localStorage.setItem("user", JSON.stringify(user))
            }catch (e) {
                console.error(e)
            }
        }
    }

    useEffect(() => {
        refreshUser().then(null);
    }, [])

    return (
        <Router>
            <GlobalContext.Provider value={globalContextValues}>
                <div className="App">
                    {animationBackground && <ParticlesBackground/>}
                    {dialog || ""}
                    <Toaster/>
                    <ReactTooltip effect="solid"/>
                    <Switch>
                        <Route
                            path="/login"
                            component={LoginPageContainer}
                        />
                        <ProtectedRoute path="/admin" component={Admin} requiredRole={"ADMIN"}/>
                        <Route path="/logout" component={Logout}/>
                        <ProtectedRoute path="/" component={UserPage} requiredRole={"USER"}/>
                    </Switch>
                </div>
            </GlobalContext.Provider>
        </Router>
    );
}

export default App;
