import React, { useContext } from "react";
import {
    DataContext,
    FilterContext,
} from "../../../../contexts/SidebarContext";
import FilterAssigneeButton from "./FilterAssigneeButton";

const FilteredAssignees = () => {
    const { filteredPersons, setFilteredPersons } = useContext(FilterContext);
    const { people } = useContext(DataContext);

    const handleChange = (e) => {
        const value = e.target.value;

        if (value === "select_person") {
        } else if (value === "all_persons") {
            setFilteredPersons(new Set());
        } else {
            const selectedPerson = people.filter(
                (person) => person.id === parseInt(value)
            )[0];
            setFilteredPersons(new Set([...filteredPersons, selectedPerson]));
        }
        e.target.value = "select_person";
    };

    return (
        <div>
            <select
                className="filter_assignees"
                defaultValue="assign_person"
                onChange={handleChange}
            >
                <option value="select_person">Select Person</option>
                <option value="all_persons">All Persons</option>
                {people
                    .filter((person) => {
                        return ![...filteredPersons]
                            .map((filteredPerson) => filteredPerson.id)
                            .includes(person.id);
                    })
                    .map((person, index) => (
                        <option key={index} value={person.id}>
                            {person.name}
                        </option>
                    ))}
            </select>
            {[...filteredPersons].length > 0 ? (
                [...filteredPersons].map((filteredPerson, index) => {
                    return (
                        <FilterAssigneeButton
                            key={index}
                            filteredPerson={filteredPerson}
                            setFilteredPersons={setFilteredPersons}
                        />
                    );
                })
            ) : (
                <button className="btn btn-sm">All</button>
            )}
        </div>
    );
};

export default FilteredAssignees;
