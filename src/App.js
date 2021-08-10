import axios from "axios";
import { useState, useEffect } from "react";
import Main from "./components/main/Main";
import SideBar from "./components/sidebar/SideBar";
import { GlobalContext } from "./contexts/GlobalContext";
import { DataContext, FilterContext } from "./contexts/SidebarContext";
import "./styles/App.css";

function App() {
    const [selectedTask, setSelectedTask] = useState();

    const [filterVisible, setFilterVisible] = useState(false);
    const [filteredPersons, setFilteredPersons] = useState(new Set());
    const [filteredPriorities, setFilteredPriorities] = useState(new Set());
    const [filteredStatuses, setFilteredStatuses] = useState(new Set());
    const [tasks, setTasks] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [people, setPeople] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4200/api/task").then((res) => {
            const data = res.data;
            console.log(data);
            setTasks(data);
        });

        axios.get("http://localhost:4200/api/person").then((res) => {
            const data = res.data;
            setPeople(data);
        });
    }, []);

    useEffect(() => {
        if (selectedTask) {
            axios
                .get(`http://localhost:4200/api/task/${selectedTask.id}/tracks`)
                .then((res) => {
                    const data = res.data;
                    setTracks(data);
                });
        } else {
            setTracks(null);
        }
    }, [selectedTask]);

    return (
        <GlobalContext.Provider value={{ selectedTask, setSelectedTask }}>
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
