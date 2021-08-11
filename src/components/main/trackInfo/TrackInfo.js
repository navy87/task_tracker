import React, { useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";
import TrackForm from "./TrackForm";
import TrackList from "./TrackList";

const TrackInfo = () => {
    const { selectedTask } = useContext(GlobalContext);

    return selectedTask ? (
        <div className="container">
            <h2 className="title">Tracks Info</h2>
            <div className="form_list_container">
                <TrackForm />
                <div className="track_list_container">
                    <h4>List of all Tracks</h4>
                    <TrackList />
                </div>
            </div>
        </div>
    ) : (
        <div>No Task Selected</div>
    );
};

export default TrackInfo;
