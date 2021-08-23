import { useState, useEffect } from "react";
import Main from "./components/main/Main";
import SideBar from "./components/sidebar/SideBar";
import { GlobalContext } from "./contexts/GlobalContext";
import { DataContext, FilterContext } from "./contexts/SidebarContext";
import "./styles/index/App.css";
import { Toaster } from "react-hot-toast";
import ReactTooltip from "react-tooltip";
import Particles from "react-tsparticles";
import styled from "styled-components";
import {
    getProfileURL,
    getTaskURL,
    getTaskTracksURL,
} from "./components/helpers/Helper";

require("dotenv").config();

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

    useEffect(() => {
        // fetch("http://localhost:4200/api/task")
        fetch(getTaskURL())
            .then((res) => res.json())
            .then((data) => setTasks(data))
            .catch((err) => console.error(err));
    }, [refreshData, setTasks]);

    useEffect(() => {
        fetch(getProfileURL())
            .then((res) => res.json())
            .then((data) => setPeople(data))
            .catch((err) => console.error(err));
    }, [refreshData, setPeople]);

    useEffect(() => {
        if (selectedTask && selectedTask.id) {
            fetch(getTaskTracksURL(selectedTask.id))
                .then((res) => res.json())
                .then((data) => setTracks(data))
                .catch((err) => console.error(err));
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

    return (
        <GlobalContext.Provider
            value={{
                selectedTask,
                setSelectedTask,
                refresh,
                trackSortOrder,
                setTrackSortOrder,
                taskSortOrder,
                setTaskSortOrder,
                dialog,
                setDialog,
            }}
        >
            <FilterContext.Provider
                value={{
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
                }}
            >
                <DataContext.Provider
                    value={{
                        tasks,
                        setTasks,
                        people,
                        setPeople,
                        tracks,
                        setTracks,
                    }}
                >
                    <div className="App">
                        <ParticleStyled
                            options={{
                                background: {
                                    color: {
                                        value: "#ffffff",
                                    },
                                },
                                fpsLimit: 60,
                                interactivity: {
                                    detectsOn: "canvas",
                                    events: {
                                        onClick: {
                                            enable: true,
                                            mode: "push",
                                        },
                                        onHover: {
                                            enable: true,
                                            mode: "repulse",
                                        },
                                        resize: true,
                                    },
                                    modes: {
                                        bubble: {
                                            distance: 400,
                                            duration: 2,
                                            opacity: 0.8,
                                            size: 40,
                                        },
                                        push: {
                                            quantity: 4,
                                        },
                                        repulse: {
                                            distance: 200,
                                            duration: 0.4,
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
                                        speed: 2,
                                        straight: false,
                                    },
                                    number: {
                                        density: {
                                            enable: true,
                                            value_area: 800,
                                        },
                                        value: 100,
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
                            }}
                            width="100vw"
                            height="100vh"
                        />
                        {dialog || ""}
                        <Toaster />
                        <ReactTooltip effect="solid" />
                        <SideBar />
                        <div id="page">
                            <div className="content">
                                <Main />
                            </div>
                        </div>
                    </div>
                </DataContext.Provider>
            </FilterContext.Provider>
        </GlobalContext.Provider>
    );
}

export default App;
