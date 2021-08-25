import { useState } from "react";

import UserPage from "./components/UserPage";

import { GlobalContext } from "./contexts/GlobalContext";
import { Toaster } from "react-hot-toast";
import ReactTooltip from "react-tooltip";
import Particles from "react-tsparticles";
import styled from "styled-components";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Admin from "./components/admin/Admin";
import "./styles/index/App.css"; // This Import must be last for some reason

function App() {
    const [dialog, setDialog] = useState();

    const ParticleStyled = styled(Particles)`
        position: fixed;
        top: 0;
        left: 0;
        z-index: -200;
    `;

    const globalContextValues = {
        dialog,
        setDialog,
    };

    const particleStyledOption = {
        background: {
            color: {
                value: "#ffffff",
            },
        },
        fpsLimit: 60,
        interactivity: {
            detectsOn: "window",
            events: {
                onClick: {
                    enable: true,
                    mode: "repulse",
                },
                onHover: {
                    enable: true,
                    mode: "bubble",
                },
                resize: true,
            },
            modes: {
                bubble: {
                    distance: 200,
                    duration: 1,
                    opacity: 0.5,
                    size: 10,
                    color: "#888888",
                },
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 100,
                    duration: 0.25,
                },
            },
        },
        particles: {
            color: {
                value: "#000000",
            },
            links: {
                color: "#000000",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
            },
            collisions: {
                enable: true,
            },
            move: {
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: false,
                speed: 1,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    value_area: 800,
                },
                value: 150,
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: "circle",
            },
            size: {
                random: true,
                value: 5,
            },
        },
        detectRetina: true,
    };

    return (
        <Router>
            <GlobalContext.Provider value={globalContextValues}>
                <div className="App">
                    <ParticleStyled
                        options={particleStyledOption}
                        width="100vw"
                        height="100vh"
                    />
                    {dialog || ""}
                    <Toaster />
                    <ReactTooltip effect="solid" />
                    <Switch>
                        <Route path="/admin" component={Admin} />
                        <Route path="/" exact component={UserPage} />
                    </Switch>
                </div>
            </GlobalContext.Provider>
        </Router>
    );
}

export default App;
