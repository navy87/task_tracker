import React, { useContext, useEffect, useState } from "react";

import { MdDeleteForever, MdSave, MdAlarm } from "react-icons/md";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { DataContext } from "../../../contexts/SidebarContext";
import { DeepCopy } from "../../helpers/Helper";
import InfoContainer from "../InfoContainer";
import AssigneeButton from "./AssigneeButton";
import PriorityInfo from "./PriorityInfo";
import SelectAssignees from "./SelectAssignees";
import StatusInfo from "./StatusInfo";

const TaskInfo = () => {
    const { selectedTask, refresh } = useContext(GlobalContext);
    const [selectedTaskCopy, setSelectedTaskCopy] = useState(undefined);
    const { people } = useContext(DataContext);

    useEffect(() => {
        if (selectedTask) {
            setSelectedTaskCopy(DeepCopy(selectedTask));
        }
    }, [selectedTask, setSelectedTaskCopy]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const requestOptions = {
            method: !selectedTaskCopy.id ? "POST" : "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selectedTaskCopy),
        };

        const url = selectedTaskCopy.id
            ? `http://localhost:4200/api/task/${selectedTask.id}`
            : `http://localhost:4200/api/task/`;

        fetch(url, requestOptions)
            .then((res) => {
                res.json();
                refresh();
            })
            .then((data) => console.log(data))
            .catch((err) => console.error(err));
    };

    return selectedTaskCopy ? (
        <div className="container">
            <h2 className="title">
                Task Info{" "}
                {selectedTaskCopy.id !== 0 || <span className="new">New</span>}
            </h2>
            <form onSubmit={handleFormSubmit} action="#" method="post">
                <div className="id_info_container">
                    <InfoContainer
                        label="ID"
                        info_render={
                            <div
                                className={`info ${
                                    selectedTaskCopy.id || "new"
                                }`}
                            >
                                {selectedTaskCopy.id || "New"}
                            </div>
                        }
                    />
                    <InfoContainer
                        label="Creation Date"
                        info_render={
                            <div className="info">
                                {selectedTaskCopy.addedDate}
                            </div>
                        }
                    />
                </div>
                <InfoContainer
                    label="Issue"
                    htmlFor="info_name"
                    info_render={
                        <input
                            id="info_name"
                            type="text"
                            name="name"
                            autoComplete="false"
                            placeholder="Issue"
                            value={selectedTaskCopy.issue}
                            onChange={(e) => {
                                setSelectedTaskCopy({
                                    ...selectedTaskCopy,
                                    issue: e.target.value,
                                });
                            }}
                        />
                    }
                />
                <InfoContainer
                    label="Description"
                    htmlFor="info_description"
                    info_render={
                        <textarea
                            id="info_description"
                            name="description"
                            placeholder="Description"
                            value={selectedTaskCopy.description}
                            onChange={(e) => {
                                setSelectedTaskCopy({
                                    ...selectedTaskCopy,
                                    description: e.target.value,
                                });
                            }}
                        ></textarea>
                    }
                />
                <InfoContainer
                    label="Assigned To"
                    info_render={
                        <div className="assignees_container">
                            <SelectAssignees
                                people={people}
                                selectedTask={selectedTaskCopy}
                                setSelectedTask={setSelectedTaskCopy}
                            />

                            {selectedTaskCopy.assignees.map(
                                (assignee, index) => (
                                    <AssigneeButton
                                        key={index}
                                        taskPerson={assignee}
                                        selectedTask={selectedTaskCopy}
                                        setSelectedTask={setSelectedTaskCopy}
                                    />
                                )
                            )}
                        </div>
                    }
                />
                <InfoContainer
                    label="Priority"
                    info_render={
                        <PriorityInfo
                            selectedTask={selectedTaskCopy}
                            setSelectedTask={setSelectedTaskCopy}
                        />
                    }
                />
                <InfoContainer
                    label="Due Date"
                    htmlFor="info_due_date"
                    info_render={
                        <input
                            id="info_due_date"
                            type="date"
                            name="due_date"
                            value={selectedTaskCopy.dueDate}
                            onChange={(e) => {
                                setSelectedTaskCopy({
                                    ...selectedTaskCopy,
                                    dueDate: e.target.value,
                                });
                            }}
                        />
                    }
                />
                <InfoContainer
                    label="Status"
                    info_render={
                        <StatusInfo
                            selectedTask={selectedTaskCopy}
                            setSelectedTask={setSelectedTaskCopy}
                        />
                    }
                />
                <div className="button_group">
                    <button type="submit" className="btn btn-submit">
                        <MdSave className="btn_icon" color="white" />
                        {(selectedTaskCopy.id && "Update") || "Add"}
                    </button>
                    {selectedTaskCopy.id === 0 || (
                        <>
                            <button
                                onClick={(e) => e.preventDefault()}
                                className="btn btn-info"
                            >
                                <MdAlarm className="btn_icon" color="black" />
                                Remind Assignees
                            </button>
                            <button
                                onClick={(e) => e.preventDefault()}
                                className="btn btn-danger"
                            >
                                <MdDeleteForever
                                    className="btn_icon"
                                    color="darkred"
                                />
                                Delete Task
                            </button>
                        </>
                    )}
                </div>
            </form>
        </div>
    ) : (
        <div>No Item Selected</div>
    );
};

export default TaskInfo;
