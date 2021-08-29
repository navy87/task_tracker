import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DataContext, FilterContext } from "../../contexts/SidebarContext";
import Header from "./header/Header";
import { getProfileURL, getTaskTracksURL, getTaskURL } from "../helpers/Helper";
import Main from "./main/Main";
import SideBar from "./sidebar/SideBar";
import { Switch, Route } from "react-router-dom";

import "../../styles/userPage/userPage.css";
import Profile from "./main/profile/Profile";
const UserPage = ({ match }) => {
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

    const refresh = () => {
        setRefreshData((oldRefresh) => !oldRefresh);
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
        selectedTask,
        setSelectedTask,
        refresh,
        trackSortOrder,
        setTrackSortOrder,
        taskSortOrder,
        setTaskSortOrder,
        tasks,
        setTasks,
        people,
        setPeople,
        tracks,
        setTracks,
    };

    return (
        <FilterContext.Provider value={filterContextValues}>
            <DataContext.Provider value={dataContextValues}>
                <Header />
                <div id="page">
                    <SideBar />
                    <div className="content">
                        <Switch>
                            <Route
                                path={`${match.url}profile`}
                                component={Profile}
                            />
                            <Route path={match.url} component={Main} />
                        </Switch>
                    </div>
                </div>
            </DataContext.Provider>
        </FilterContext.Provider>
    );
};

export default UserPage;
