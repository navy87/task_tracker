import React from "react";

const FilterAssigneeButton = ({ filteredPerson, setFilteredPersons }) => {
    const handleRemovePerson = (e) => {
        e.preventDefault();
        setFilteredPersons((currentPersons) => {
            return new Set(
                [...currentPersons].filter(
                    (person) => person.id !== filteredPerson.id
                )
            );
        });
    };

    console.log(filteredPerson);
    return (
        <button className="btn btn-sm" onClick={handleRemovePerson}>
            {filteredPerson.fullName}
        </button>
    );
};

export default FilterAssigneeButton;
