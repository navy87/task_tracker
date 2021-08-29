import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GlobalContext } from "../../../../contexts/GlobalContext";
import AddPerson from "./AddPerson";
import Dialog from "../../../helpers/Dialog";
import { fetchingErrorHandler, getProfileURL } from "../../../helpers/Helper";

const SelectAssignees = ({ selectedTask, setSelectedTask }) => {
    const { setDialog } = useContext(GlobalContext);
    const [people, setPeople] = useState([]);
    const [availablePeople, setAvailablePeople] = useState([]);

    useEffect(() => {
        fetch(getProfileURL())
            .then((res) => res.json())
            .then((data) => {
                setPeople(data);
            })
            .catch((err) => fetchingErrorHandler(err));
    }, [setPeople]);

    useEffect(() => {
        const mapped = selectedTask.assignees.map(
            (taskPerson) => taskPerson.userProfile.id
        );
        setAvailablePeople(
            people.filter((person) => {
                return !mapped.includes(person.id);
            })
        );
    }, [people, setAvailablePeople, selectedTask]);

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
                    userProfile: selectedPerson,
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
            {availablePeople.map((person, index) => (
                <option key={index} value={person.id}>
                    {person.fullName}
                </option>
            ))}
            <option value="add_person">Add Person</option>
        </select>
    );
};

export default SelectAssignees;
