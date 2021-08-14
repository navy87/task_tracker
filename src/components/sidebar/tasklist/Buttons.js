import React, { useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { GetToday } from "../../helpers/Helper";
import { MdNoteAdd, MdPeople } from "react-icons/md";
import Dialog from "../../helpers/Dialog";
import PersonDialog from "../person/PersonDialog";

const Buttons = () => {
    const { setSelectedTask, setDialog } = useContext(GlobalContext);

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

    const handlePeople = (e) => {
        e.preventDefault();
        setDialog(<Dialog render={<PersonDialog />} />);
    };

    return (
        <div className="buttons">
            <button className="md_btn" onClick={handleAddTask}>
                <MdNoteAdd className="icon" /> Add Task
            </button>
            <button className="md_btn" onClick={handlePeople}>
                <MdPeople className="icon" /> People
            </button>
        </div>
    );
};

export default Buttons;
