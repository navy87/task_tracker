import React, {useState} from "react";
import {BsSearch} from "react-icons/bs";
import {DeepCopy} from "../../helpers/Helper";
import PeopleList from "./PeopleList";
import PersonForm from "./PersonForm";

const PersonDialog = () => {
    const emptyPerson = {
        id: 0,
        name: "",
        email: "",
    };
    const [currentPerson, setCurrentPerson] = useState(DeepCopy(emptyPerson));
    const [filteredKeyword, setFilteredKeyword] = useState("");

    const handleAddPerson = (e) => {
        e.preventDefault();
        setCurrentPerson(DeepCopy(emptyPerson));
    };

    return (
        <div id="person_dialog">
            <div className="searchbox">
                <input
                    type="text"
                    placeholder="Search"
                    value={filteredKeyword}
                    onChange={(e) => setFilteredKeyword(e.target.value)}
                />
                <BsSearch className="search_btn"/>
            </div>
            <div className="buttons">
                <button onClick={handleAddPerson}>Add Person</button>
            </div>
            <div className="edit_form_container">
                <h3>
                    Person Detail{" "}
                    {currentPerson.id === 0 && <span className="new">New</span>}
                </h3>
                <PersonForm
                    currentPerson={currentPerson}
                    setCurrentPerson={setCurrentPerson}
                />
            </div>
            <PeopleList
                currentPerson={currentPerson}
                setCurrentPerson={setCurrentPerson}
                filteredKeyword={filteredKeyword}
            />
        </div>
    );
};

export default PersonDialog;
