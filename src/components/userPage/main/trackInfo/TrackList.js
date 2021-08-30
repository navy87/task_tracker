import React, {useContext} from "react";
import {DataContext} from "../../../../contexts/SidebarContext";
import TrackItem from "./TrackItem";

const TrackList = ({tracks}) => {
    const {trackSortOrder} = useContext(DataContext);

    return (
        <div className="tracks_list">
            {tracks
                .sort((track1, track2) => {
                    let descendingValue =
                        new Date(track2.date) - new Date(track1.date);

                    if (descendingValue === 0) {
                        const addedTimeAscending =
                            new Date(track2.addedTime) -
                            new Date(track1.addedTime);
                        descendingValue = addedTimeAscending;
                    }
                    return (
                        descendingValue * (trackSortOrder === "desc" ? 1 : -1)
                    );
                })
                .map((track, index) => (
                    <TrackItem track={track} key={index}/>
                ))}
        </div>
    );
};

export default TrackList;
