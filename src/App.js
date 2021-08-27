import { useState } from "react";

import { Toaster } from "react-hot-toast";
import ReactTooltip from "react-tooltip";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import { AuthContext, GlobalContext } from "contexts/GlobalContext";
import Admin from "components/admin/Admin";
import LoginPageContainer from "components/login/LoginPageContainer";
import ParticlesBackground from "components/particles/ParticlesBackground";
import UserPage from "components/userPage/UserPage";

import "./styles/index/App.css"; // This Import must be last for some reason

function App() {
    const [dialog, setDialog] = useState();

    const globalContextValues = {
        dialog,
        setDialog,
    };

    const authContextValues = {};

    return (
        <Router>
            <AuthContext.Provider value={authContextValues}>
                <GlobalContext.Provider value={globalContextValues}>
                    <div className="App">
                        <ParticlesBackground />
                        {dialog || ""}
                        <Toaster />
                        <ReactTooltip effect="solid" />
                        <Switch>
                            <Route
                                path="/login"
                                component={LoginPageContainer}
                            />
                            <Route path="/admin" component={Admin} />
                            <Route path="/" component={UserPage} />
                        </Switch>
                    </div>
                </GlobalContext.Provider>
            </AuthContext.Provider>
        </Router>
    );
}

export default App;
