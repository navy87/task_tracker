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

    return (
        <button className="btn btn-sm" onClick={handleRemovePerson}>
            {filteredPerson.name}
        </button>
    );
};

export default FilterAssigneeButton;
