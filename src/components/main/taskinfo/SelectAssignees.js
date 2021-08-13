import React from "react";

const SelectAssignees = ({ people, selectedTask, setSelectedTask }) => {
    const handleChange = (e) => {
        const value = e.target.value;
        if (value === "assign_person") {
            alert("Assign Person");
        } else if (value === "add_person") {
            alert("Add Person");
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
            e.target.value = "assign_person";
        }
    };

    return (
        <select className="select_assignees" defaultValue="assign_person" onChange={handleChange}>
            <option value="assign_person">Select Person</option>
            {people
                .filter(
                    (person) =>
                        !selectedTask.assignees
                            .map((taskPerson) => taskPerson.person.id)
                            .includes(person.id)
                )
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
