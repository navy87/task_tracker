import React from "react";
import { AiOutlineUserDelete } from "react-icons/ai";

const AssigneeButton = ({ taskPerson }) => {
    const clicked = (e) => {
        // e.preventDefault();
        // alert("Button Clicked");
    };

    const removeClicked = (e) => {
        e.preventDefault();
        alert("Remove Clicked");
    };

    return (
        <div className={`btn assignee_btn ${taskPerson.leader && "leader"}`}>
            <span onClick={clicked} className="assignee_name">
                {taskPerson.person.name}
            </span>
            <AiOutlineUserDelete
                className="remove_icon"
                onClick={removeClicked}
            />
        </div>
    );
};

export default AssigneeButton;
