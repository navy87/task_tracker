import React, { useContext } from "react";
import { GetToday } from "../../../helpers/Helper";
import { MdNoteAdd } from "react-icons/md";
import { DataContext } from "../../../../contexts/SidebarContext";

const Buttons = () => {
    const { setSelectedTask } = useContext(DataContext);

    const emptyTask = {
        id: 0,
        issue: "",
        description: "",
        addedDate: new Date().toISOString(),
        dueDate: GetToday(),
        status: "ACTIVE",
        priority: "HIGH",
        assignees: [],
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        setSelectedTask(emptyTask);
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
