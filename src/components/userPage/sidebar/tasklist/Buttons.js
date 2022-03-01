import React from "react";
import { MdNoteAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Buttons = () => {
    const navigate = useNavigate();
    const handleAddTask = (e) => {
        e.preventDefault();
        navigate("/task/new");
    };

    return (
        <div className="buttons">
            <button className="md_btn" onClick={handleAddTask}>
                <MdNoteAdd className="icon" /> Add Task
            </button>
        </div>
    );
};

export default Buttons;
