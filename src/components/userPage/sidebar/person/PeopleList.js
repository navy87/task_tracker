import React, { useContext } from "react";
import PersonItem from "./PersonItem";
import { DataContext } from "../../../contexts/SidebarContext";

const PersonList = ({ currentPerson, setCurrentPerson, filteredKeyword }) => {
    const { people } = useContext(DataContext);

    console.log(people);
    return (
        <div className="people_list">
            {[...people]
                .filter((person) => {
                    return person.fullName
                        .toLowerCase()
                        .includes(filteredKeyword.toLowerCase());
                })
                .sort((a, b) => {
                    return a.fullName
                        .toLowerCase()
                        .localeCompare(b.fullName.toLowerCase());
                })
                .map((person, index) => (
                    <PersonItem
                        currentPerson={person}
                        setCurrentPerson={setCurrentPerson}
                        key={index}
                        selected={
                            currentPerson && currentPerson.id === person.id
                        }
                    />
                ))}
        </div>
    );
};

export default PersonList;
