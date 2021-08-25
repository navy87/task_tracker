import React, { useContext } from "react";
import TrackForm from "./TrackForm";
import TrackList from "./TrackList";
import SortOrder from "./SortOrder";
import { DataContext } from "../../../contexts/SidebarContext";

const TrackInfo = () => {
    const { selectedTask, trackSortOrder, setTrackSortOrder } =
        useContext(DataContext);

    return selectedTask && selectedTask.id ? (
        <div className="container">
            <h2 className="title">Tracks Info</h2>
            <div className="form_list_container">
                <TrackForm />
                <div className="track_list_container">
                    <div className="head">
                        <h4>List of all Tracks</h4>

                        <SortOrder
                            selected={trackSortOrder}
                            setTrackSortOrder={setTrackSortOrder}
                        />
                    </div>
                    <TrackList />
                </div>
            </div>
        </div>
    ) : (
        <></>
    );
};

export default TrackInfo;
