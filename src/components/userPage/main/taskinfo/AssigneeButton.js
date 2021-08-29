import React from "react";
import { TiDelete } from "react-icons/ti";
import { MdStar, MdStarBorder } from "react-icons/md";
import toast from "react-hot-toast";

const AssigneeButton = ({ taskPerson, setSelectedTask, selectedTask }) => {
    const clicked = (e) => {
        e.preventDefault();
    };

    const removeClicked = (e) => {
        e.preventDefault();
        const personId = taskPerson.userProfile.id;
        if (selectedTask.assignees.length === 1) {
            toast.error("Need At Least One Person to Assign To", {
                duration: 4000,
                position: "top-center",
            });
            return;
        }
        const assignees = [...selectedTask.assignees].filter(
            (taskPerson1) => taskPerson1.userProfile.id !== personId
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
        setSelectedTask({ ...selectedTask, assignees });
    };

    return (
        <div
            className={`btn assignee_btn ${taskPerson.leader && "leader"}`}
            data-tip="Remove Person"
        >
            <span onClick={clicked} className="assignee_name">
                {taskPerson.userProfile.fullName}
            </span>
            <span onClick={handleLeaderToggle} data-tip="Make Leader">
                {taskPerson.leader ? (
                    <MdStar className="icon star leader" />
                ) : (
                    <MdStarBorder className="icon star" />
                )}
            </span>

            <TiDelete
                className="icon remove_icon"
                data-tip="Remove Person"
                onClick={removeClicked}
            />
        </div>
    );
};

export default AssigneeButton;
