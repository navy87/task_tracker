import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {DataContext, FilterContext} from "../../contexts/SidebarContext";
import Header from "./header/Header";
import {getProfileURL, getTaskTracksURL, getTaskURL} from "../../helpers/Helper";
import Main from "./main/Main";
import SideBar from "./sidebar/SideBar";
import {Route, Switch} from "react-router-dom";

import "../../styles/userPage/userPage.css";
import axios from "axios";

const UserPage = ({match}) => {
    const [selectedTask, setSelectedTask] = useState({id: null});
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
                duration: 5000,
            }
        );
    };

    const refresh = () => {
        setRefreshData((oldRefresh) => !oldRefresh);
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get(getTaskURL());
                const data = res.data;
                setTasks(data)
                return data
            } catch (e) {
                fetchingErrorHandler(e)
            }
        }
        fetchTasks().then(data => data); // Just to remove the annoying warning on webstorm
    }, [refreshData, setTasks]);

    useEffect(() => {
        const fetchPeople = async () => {
            try {
                const res = await axios.get(getProfileURL())
                setPeople(res.data)
            } catch (e) {
                fetchingErrorHandler(e)
            }
        }
        fetchPeople().then(res => res)
    }, [refreshData, setPeople]);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const res = await axios.get(getTaskTracksURL(selectedTask.id))
                setTracks(res.data)
            } catch (e) {
                fetchingErrorHandler(e)
            }
        }

        if (selectedTask && selectedTask.id) {
            fetchTracks().then(res => res)
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
                <Header/>
                <div id="page">
                    <SideBar/>
                    <div className="content">
                        <Switch>
                            <Route path={match.url} component={Main}/>
                        </Switch>
                    </div>
                </div>
            </DataContext.Provider>
        </FilterContext.Provider>
    );
};

export default UserPage;
