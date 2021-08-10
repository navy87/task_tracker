import React, { useContext } from "react";
import { DataContext } from "../../../contexts/SidebarContext";
import TrackItem from "./TrackItem";

const TrackList = () => {
    const { tracks } = useContext(DataContext);
    // const { selectedItem } = useContext(GlobalContext);

    console.log("Tracks: " + tracks);
    return (
        <div className="tracks_list">
            {tracks &&
                tracks.map((track) => (
                    <TrackItem track={track} key={track.id} />
                ))}
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
