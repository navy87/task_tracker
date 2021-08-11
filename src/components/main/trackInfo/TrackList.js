import React, { useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { DataContext } from "../../../contexts/SidebarContext";
import TrackItem from "./TrackItem";

const TrackList = () => {
    const { tracks } = useContext(DataContext);
    const { sortOrder } = useContext(GlobalContext);

    return (
        <div className="tracks_list">
            {tracks &&
                tracks
                    .sort((track1, track2) => {
                        let descendingValue =
                            new Date(track2.date) - new Date(track1.date);

                        if (descendingValue == 0) {
                            const addedTimeAscending =
                                new Date(track2.addedTime) -
                                new Date(track1.addedTime);
                            descendingValue = addedTimeAscending;
                        }
                        return descendingValue * (sortOrder === "desc" ? 1 : -1);
                        // if (sortOrder === "asc") {
                        //     return (
                        //         new Date(track2.date) - new Date(track1.date)
                        //     );
                        // } else {
                        //     return (
                        //         new Date(track1.date) - new Date(track2.date)
                        //     );
                        // }
                        // return ascendingValue;
                    })
                    .map((track) => <TrackItem track={track} key={track.id} />)}
            {/* <TrackItem />
            <TrackItem />
            <TrackItem />
            <TrackItem />
            <TrackItem />
            <TrackItem />
            <TrackItem /> */}
        </div>
    );
};

export default TrackList;
