import { useState, useEffect } from "react";

import UserPage from "./components/UserPage";

import { GlobalContext } from "./contexts/GlobalContext";
import { DataContext, FilterContext } from "./contexts/SidebarContext";
import toast, { Toaster } from "react-hot-toast";
import ReactTooltip from "react-tooltip";
import Particles from "react-tsparticles";
import styled from "styled-components";
import {
    getProfileURL,
    getTaskURL,
    getTaskTracksURL,
} from "./components/helpers/Helper";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Admin from "./components/admin/Admin";
import "./styles/index/App.css"; // This Import must be last for some reason

function App() {
    const [selectedTask, setSelectedTask] = useState();
    const [trackSortOrder, setTrackSortOrder] = useState("desc");
    const [taskSortOrder, setTaskSortOrder] = useState({
        by: "dueDate",
        order: "asc",
    });

    const [filterVisible, setFilterVisible] = useState(false);
    const [filteredPersons, setFilteredPersons] = useState(new Set());
    const [filteredPriorities, setFilteredPriorities] = useState(new Set());
    const [filteredStatuses, setFilteredStatuses] = useState(new Set());
    const [filteredKeywords, setFilteredKeywords] = useState("");

    const [sorterVisible, setSorterVisible] = useState(false);

    const [tasks, setTasks] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [people, setPeople] = useState([]);

    const [refreshData, setRefreshData] = useState(false);

    const [dialog, setDialog] = useState();

    const refresh = () => {
        setRefreshData((oldRefresh) => !oldRefresh);
    };

    const fetchingErrorHandler = (err) => {
        console.error(err);
        toast.error(
            "Something went wrong! Please make sure the server is running.",
            {
                position: "top-center",
                autoClose: 5000,
            }
        );
    };

    useEffect(() => {
        fetch(getTaskURL())
            .then((res) => res.json())
            .then((data) => setTasks(data))
            .catch((err) => fetchingErrorHandler(err));
    }, [refreshData, setTasks]);

    useEffect(() => {
        fetch(getProfileURL())
            .then((res) => res.json())
            .then((data) => setPeople(data))
            .catch((err) => fetchingErrorHandler(err));
    }, [refreshData, setPeople]);

    useEffect(() => {
        if (selectedTask && selectedTask.id) {
            fetch(getTaskTracksURL(selectedTask.id))
                .then((res) => res.json())
                .then((data) => setTracks(data))
                .catch((err) => fetchingErrorHandler(err));
        } else {
            setTracks(null);
        }
    }, [refreshData, selectedTask]);

    const ParticleStyled = styled(Particles)`
        position: fixed;
        top: 0;
        left: 0;
        z-index: -200;
    `;

    const globalContextValues = {
        selectedTask,
        setSelectedTask,
        refresh,
        trackSortOrder,
        setTrackSortOrder,
        taskSortOrder,
        setTaskSortOrder,
        dialog,
        setDialog,
    };

    const filterContextValues = {
        filterVisible,
        setFilterVisible,
        filteredPersons,
        setFilteredPersons,
        filteredPriorities,
        setFilteredPriorities,
        filteredStatuses,
        setFilteredStatuses,
        filteredKeywords,
        setFilteredKeywords,
        sorterVisible,
        setSorterVisible,
    };

    const dataContextValues = {
        tasks,
        setTasks,
        people,
        setPeople,
        tracks,
        setTracks,
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
                <FilterContext.Provider value={filterContextValues}>
                    <DataContext.Provider value={dataContextValues}>
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
                            {/* <SideBar />
                        <div id="page">
                            <div className="content">
                                <Main />
                            </div>
                        </div> */}
                        </div>
                    </DataContext.Provider>
                </FilterContext.Provider>
            </GlobalContext.Provider>
        </Router>
    );
}

export default App;
