import { useState} from "react";

import {Toaster} from "react-hot-toast";
import ReactTooltip from "react-tooltip";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import { GlobalContext} from "./contexts/GlobalContext";
import Admin from "./components/admin/Admin";
import LoginPageContainer from "./components/auth/LoginPageContainer";
import ParticlesBackground from "./components/particles/ParticlesBackground";
import UserPage from "./components/userPage/UserPage";

import "styles/index/App.css"; // This Import must be last for some reason
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Logout from "./components/auth/Logout";

function App() {
    const [dialog, setDialog] = useState();

    const globalContextValues = {
        dialog,
        setDialog,
    };


    return (
        <Router>
                <GlobalContext.Provider value={globalContextValues}>
                    <div className="App">
                        <ParticlesBackground/>
                        {dialog || ""}
                        <Toaster/>
                        <ReactTooltip effect="solid"/>
                        <Switch>
                            <Route
                                path="/login"
                                component={LoginPageContainer}
                            />
                            <Route path="/admin" component={Admin}/>
                            <ProtectedRoute path="/logout" component={Logout}/>
                            {/* TODO Unprotected */}
                            {/* <Route path="/" component={UserPage} /> */}
                            <ProtectedRoute path="/" component={UserPage}/>
                        </Switch>
                    </div>
                </GlobalContext.Provider>
        </Router>
    );
}

export default App;
