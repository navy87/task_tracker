import React from "react";
import { AiOutlineUserDelete } from "react-icons/ai";

const AssigneeButton = ({ taskPerson, setSelectedTask, selectedTask }) => {
    const clicked = (e) => {
        // e.preventDefault();
        // alert("Button Clicked");
    };

    const removeClicked = (e) => {
        e.preventDefault();
        const personId = taskPerson.person.id;
        if (selectedTask.assignees.length === 1) {
            alert("Need At Least One Person to Assign To");
            return;
        }
        const assignees = [...selectedTask.assignees].filter(
            (taskPerson1) => taskPerson1.person.id !== personId
        );

        if (assignees.length === 1) {
            assignees[0].leader = true;
        }

        const newSelectedTask = { ...selectedTask, assignees };
        setSelectedTask(newSelectedTask);
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
