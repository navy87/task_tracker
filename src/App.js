// import axios from "axios";
import { useState, useEffect } from "react";
import Main from "./components/main/Main";
import SideBar from "./components/sidebar/SideBar";
import { GlobalContext } from "./contexts/GlobalContext";
import { DataContext, FilterContext } from "./contexts/SidebarContext";
import "./styles/index/App.css";
// import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import ReactTooltip from "react-tooltip";

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
        fetch("http://localhost:4200/api/task")
            .then((res) => res.json())
            .then((data) => setTasks(data))
            .catch((err) => console.error(err));

        fetch("http://localhost:4200/api/person")
            .then((res) => res.json())
            .then((data) => setPeople(data))
            .catch((err) => console.error(err));
    }, [refreshData, setTasks, setPeople]);

    useEffect(() => {
        if (selectedTask && selectedTask.id) {
            fetch(`http://localhost:4200/api/task/${selectedTask.id}/tracks`)
                .then((res) => res.json())
                .then((data) => setTracks(data))
                .catch((err) => console.error(err));
        } else {
            setTracks(null);
        }
    }, [refreshData, selectedTask]);

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
                        {dialog || ""}
                        <Toaster />
                        <ReactTooltip />
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
