import React, { useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { GetToday } from "../../helpers/Helper";

const Buttons = () => {
    const { setSelectedTask } = useContext(GlobalContext);

    /**
     * 
     const k = {
         id: 4,
         issue: "Household Chores",
         description: "Doing dishes, and cleaning the living room",
         addedDate: "2021-08-13T08:27:10.435083",
         dueDate: "2021-09-12",
         status: "ACTIVE",
         priority: "HIGH",
         assignees: [
             { id: 9, person: { id: 2, name: "Mame Fati" }, leader: false },
             { id: 4, person: { id: 1, name: "Hanan Fati" }, leader: true },
         ],
     };
     *
     */

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
                Add Task
            </button>
            <button className="md_btn">People</button>
        </div>
    );
};

export default Buttons;
