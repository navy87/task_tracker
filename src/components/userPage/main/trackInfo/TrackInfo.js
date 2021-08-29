import React, { useContext, useEffect, useState } from "react";
import TrackForm from "./TrackForm";
import TrackList from "./TrackList";
import SortOrder from "./SortOrder";
import { DataContext } from "../../../../contexts/SidebarContext";
import ReactLoading from "react-loading";
import {
    fetchingErrorHandler,
    getTaskTracksURL,
} from "../../../helpers/Helper";

const TrackInfo = ({ match }) => {
    const { trackSortOrder, setTrackSortOrder } = useContext(DataContext);
    const [taskId, setTaskId] = useState(match.params.id);
    const [tracks, setTracks] = useState({});

    const STATUSES = { loaded: "loaded", loading: "loading", new: "new" };
    Object.freeze(STATUSES);
    const [status, setStatus] = useState(STATUSES.loading);
    const [refresh, setRefresh] = useState(true);

    const refreshTracks = () => {
        setRefresh((current) => !current);
    };
    useEffect(() => {
        setTaskId(match.params.id);
    }, [match]);

    useEffect(() => {
        const fetchTracks = async () => {
            const url = getTaskTracksURL(taskId);
            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    setTracks(data);
                    setStatus(STATUSES.loaded);
                })
                .catch((err) => fetchingErrorHandler(err));
        };
        if (taskId.toLowerCase() === "new") {
            setStatus(STATUSES.new);
        } else {
            setStatus(STATUSES.loading);
            fetchTracks();
        }
    }, [
        refresh,
        taskId,
        setTracks,
        STATUSES.loaded,
        STATUSES.loading,
        STATUSES.new,
    ]);

    const notLoadedSelect = () => {
        return status === STATUSES.loading ? (
            <div className="loading-container">
                <ReactLoading />
            </div>
        ) : (
            <></>
        );
    };

    return status === STATUSES.loaded ? (
        <div className="container">
            <h2 className="title">Tracks Info</h2>
            <div className="form_list_container">
                <TrackForm refreshTracks={refreshTracks} />
                <div className="track_list_container">
                    <div className="head">
                        <h4>List of all Tracks</h4>

                        <SortOrder
                            selected={trackSortOrder}
                            setTrackSortOrder={setTrackSortOrder}
                        />
                    </div>
                    <TrackList tracks={tracks} />
                </div>
            </div>
        </div>
    ) : (
        notLoadedSelect()
    );
};

export default TrackInfo;
