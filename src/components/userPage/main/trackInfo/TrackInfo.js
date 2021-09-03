import React, {useContext, useEffect, useState} from "react";
import TrackForm from "./TrackForm";
import TrackList from "./TrackList";
import SortOrder from "./SortOrder";
import {DataContext} from "../../../../contexts/SidebarContext";
import ReactLoading from "react-loading";
import {fetchingErrorHandler, getTaskTracksURL,} from "../../../../helpers/Helper";
import axios from "axios";

const TrackInfo = ({match}) => {
    const {trackSortOrder, setTrackSortOrder} = useContext(DataContext);
    const [taskId, setTaskId] = useState(match.params.id);
    const [tracks, setTracks] = useState({});

    const STATUSES = {loading: 0, loaded: 1, new: 2, forbidden: 3};
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
            try {
                const url = getTaskTracksURL(taskId);
                const res = await axios.get(url);
                const data = res.data
                if (res.status === 200) {
                    setTracks(data)
                    setStatus(STATUSES.loaded)
                }
                return data
            } catch (e) {
                if (e.response.status === 403) {
                    setStatus(STATUSES.forbidden)
                } else {
                    console.log(JSON.stringify(e))
                    fetchingErrorHandler(e)
                }
            }
        };
        if (taskId.toLowerCase() === "new") {
            setStatus(STATUSES.new);
        } else {
            setStatus(STATUSES.loading);
            fetchTracks().then(null);
        }
    }, [
        refresh,
        taskId,
        setTracks,
        STATUSES.loaded,
        STATUSES.loading,
        STATUSES.new,
        STATUSES.forbidden,
    ]);

    const notLoadedSelect = () => {
        switch (status) {
            case STATUSES.loading:
                return <div className="loading-container">
                    <ReactLoading/>
                </div>
            case STATUSES.new:
                return <></>
            case STATUSES.forbidden:
                return <div>Forbidden</div>
            default:
                return <></>
        }
    };

    return status === STATUSES.loaded ? (
        <div className="container">
            <h2 className="title">Tracks Info</h2>
            <div className="form_list_container">
                <TrackForm refreshTracks={refreshTracks}/>
                <div className="track_list_container">
                    <div className="head">
                        <h4>List of all Tracks</h4>

                        <SortOrder
                            selected={trackSortOrder}
                            setTrackSortOrder={setTrackSortOrder}
                        />
                    </div>
                    <TrackList tracks={tracks}/>
                </div>
            </div>
        </div>
    ) : (
        notLoadedSelect()
    );
};

export default TrackInfo;
