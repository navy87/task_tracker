import React from "react";
import {MdNoteAdd} from "react-icons/md";
import {useHistory} from "react-router-dom";

const Buttons = () => {
    const history = useHistory();
    const handleAddTask = (e) => {
        e.preventDefault();
        history.push("/task/new");
    };

    return (
        <div className="buttons">
            <button className="md_btn" onClick={handleAddTask}>
                <MdNoteAdd className="icon"/> Add Task
            </button>
        </div>
    );
};

export default Buttons;
