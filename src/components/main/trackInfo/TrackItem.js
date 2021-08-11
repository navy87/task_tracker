import React, { useContext } from "react";
import { MdRemoveCircleOutline } from "react-icons/md";
import { GlobalContext } from "../../../contexts/GlobalContext";

const TrackItem = ({ track }) => {
    const { refresh } = useContext(GlobalContext);
    const handleDelete = (e) => {
        e.preventDefault();

        const requestOptions = {
            method: "DELETE",
        };

        const url = `http://localhost:4200/api/track/${track.id}`;
        fetch(url, requestOptions)
            .then((res) => {
                res.text();
                refresh();
            })
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
    };

    return (
        <div className="track_item">
            <p className="date">{track.date}</p>
            <div className="track_head">
                <h5 className="head">{track.title}</h5>
                <MdRemoveCircleOutline
                    className="icon"
                    onClick={handleDelete}
                />
            </div>
            <p className="description">{track.description}</p>
        </div>
    );
};

export default TrackItem;
