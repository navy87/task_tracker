import React, {useContext, useEffect, useState} from "react";
import {MdAddCircleOutline} from "react-icons/md";
import InfoContainer from "../InfoContainer";
import {DeepCopy, getTaskTracksURL, GetToday} from "../../../../helpers/Helper";
import toast from "react-hot-toast";
import {DataContext} from "../../../../contexts/SidebarContext";
import axios from "axios";

const TrackForm = ({refreshTracks}) => {
    const {selectedTask} = useContext(DataContext);

    const [emptyTrack] = useState({
        date: GetToday(),
        description: "",
        id: 0,
        title: "",
    });

    const [track, setTrack] = useState(DeepCopy(emptyTrack));

    useEffect(() => {
        setTrack(DeepCopy(emptyTrack));
    }, [selectedTask, emptyTrack]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const url = getTaskTracksURL(selectedTask.id);
        try {
            const res = await axios.post(url, JSON.stringify(track));
            if (res.status === 200) {
                refreshTracks();
                toast.success("Track has been added!", {
                    duration: 4000,
                });
            }
        } catch (e) {
            console.error(e)
            toast.error("There was an error.", {
                duration: 4000,
            })
        }

        setTrack(DeepCopy(emptyTrack));
    };

    return (
        <form onSubmit={handleFormSubmit} action="/" method="post">
            <InfoContainer
                label="Date"
                htmlFor="track_info_id"
                info_render={
                    <input
                        id="track_info_id"
                        type="date"
                        name="date"
                        value={track.date}
                        required
                        onChange={(e) =>
                            setTrack({...track, date: e.target.value})
                        }
                    />
                }
            />
            <InfoContainer
                label="Track"
                htmlFor="track_title"
                info_render={
                    <input
                        id="track_title"
                        type="text"
                        name="title"
                        autoComplete="offx"
                        placeholder="Title"
                        required
                        value={track.title}
                        onChange={(e) =>
                            setTrack({...track, title: e.target.value})
                        }
                    />
                }
            />
            <InfoContainer
                label="Description"
                htmlFor="track_description"
                info_render={
                    <textarea
                        id="track_description"
                        name="description"
                        placeholder="Description"
                        required
                        value={track.description}
                        onChange={(e) =>
                            setTrack({...track, description: e.target.value})
                        }
                    ></textarea>
                }
            />
            <button type="submit" className="btn btn-submit">
                <MdAddCircleOutline className="btn_icon"/> Accept
            </button>
        </form>
    );
};

export default TrackForm;
