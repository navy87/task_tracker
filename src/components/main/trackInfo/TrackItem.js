import React from "react";
import { MdRemoveCircleOutline } from "react-icons/md";

const TrackItem = ({ track }) => {
    // const track = {
    //     id: 2,
    //     name: "Task Created",
    //     description: "Task has been created",
    //     date: "2021-08-10",
    //     task: {
    //         id: 2,
    //         issue: "Ilham Passport Appointment",
    //         description: "This is Ilham's Passport Appointment.",
    //         addedDate: "2021-08-10T17:13:22.923949",
    //         dueDate: "2021-08-31",
    //         status: "CANCELLED",
    //         priority: "LOW",
    //         assignees: [
    //             { id: 2, person: { id: 3, name: "Ilham Fati" }, leader: true },
    //         ],
    //     },
    // };
    return (
        <div className="track_item">
            <p className="date">{track.date}</p>
            <div className="track_head">
                <h5 className="head">{track.name}</h5>
                <MdRemoveCircleOutline
                    className="icon"
                    onClick={() => alert("Deleted")}
                />
            </div>
            <p className="description">{track.description}</p>
        </div>
    );
};

export default TrackItem;
