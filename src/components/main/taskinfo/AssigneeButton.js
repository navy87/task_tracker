import React from "react";
import { AiOutlineUserDelete } from "react-icons/ai";
import { MdStar, MdStarBorder } from "react-icons/md";

const AssigneeButton = ({ taskPerson, setSelectedTask, selectedTask }) => {
    const clicked = (e) => {
        e.preventDefault();
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

    const handleLeaderToggle = (e) => {
        const assignees = [...selectedTask.assignees].map((assignee) => ({
            ...assignee,
            leader: assignee.id === taskPerson.id,
        }));
        console.log(assignees);
        setSelectedTask({ ...selectedTask, assignees });
    };

    return (
        <div className={`btn assignee_btn ${taskPerson.leader && "leader"}`}>
            <span onClick={clicked} className="assignee_name">
                {taskPerson.person.name}
            </span>
            <AiOutlineUserDelete
                className="icon remove_icon"
                onClick={removeClicked}
            />

            <span onClick={handleLeaderToggle}>
                {taskPerson.leader ? (
                    <MdStar className="icon star leader" />
                ) : (
                    <MdStarBorder className="icon star" />
                )}
            </span>
        </div>
    );
};

export default AssigneeButton;
