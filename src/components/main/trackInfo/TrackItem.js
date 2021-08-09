import React from "react";
import { MdRemoveCircleOutline } from "react-icons/md";

const TrackItem = () => {
    return (
        <div className="track_item">
            <p className="date">Aug. 11, 2021</p>
            <div className="track_head">
                <h5 className="head">Derash Track</h5>
                <MdRemoveCircleOutline
                    className="icon"
                    onClick={() => alert("Deleted")}
                />
            </div>
            <p className="description">
                Derash Didn’t Come To Office. I think this is not the kind of
                behaviour we like in the middle of the project.
            </p>
        </div>
    );
};

export default TrackItem;
