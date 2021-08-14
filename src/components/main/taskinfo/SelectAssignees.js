import React, { useContext } from "react";
import toast from "react-hot-toast";
import { GlobalContext } from "../../../contexts/GlobalContext";
import AddPerson from "./AddPerson";
import Dialog from "../../helpers/Dialog";

const SelectAssignees = ({ people, selectedTask, setSelectedTask }) => {
    const { setDialog } = useContext(GlobalContext);
    const handleChange = (e) => {
        const value = e.target.value;
        if (value === "assign_person") {
            toast.success("Assign Person");
        } else if (value === "add_person") {
            setDialog(
                <Dialog
                    render={
                        <AddPerson
                            selectedTask={selectedTask}
                            setSelectedTask={setSelectedTask}
                        />
                    }
                    title="Add New Person"
                />
            );
        } else {
            const selectedPerson = people.filter(
                (person) => person.id === parseInt(value)
            )[0];
            const assignees = [
                ...selectedTask.assignees,
                {
                    id: 0,
                    leader: false,
                    person: selectedPerson,
                },
            ];
            setSelectedTask({ ...selectedTask, assignees });
        }
        e.target.value = "assign_person";
    };

    return (
        <select
            className="select_assignees"
            defaultValue="assign_person"
            onChange={handleChange}
        >
            <option value="assign_person">Select Person</option>
            {people
                .filter((person) => {
                    const mapped = selectedTask.assignees.map((taskPerson) => {
                        return taskPerson.person.id;
                    });
                    return !mapped.includes(person.id);
                })
                .map((person, index) => (
                    <option key={index} value={person.id}>
                        {person.name}
                    </option>
                ))}
            <option value="add_person">Add Person</option>
        </select>
    );
};

export default SelectAssignees;
