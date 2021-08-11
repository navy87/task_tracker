import React, { useContext, useEffect, useState } from "react";

import { AiOutlineUserAdd } from "react-icons/ai";
import { MdDeleteForever, MdSave, MdAlarm } from "react-icons/md";
import { GlobalContext } from "../../../contexts/GlobalContext";
import InfoContainer from "../InfoContainer";
import AssigneeButton from "./AssigneeButton";
import PriorityInfo from "./PriorityInfo";
import StatusInfo from "./StatusInfo";

const TaskInfo = () => {
    const { selectedTask } = useContext(GlobalContext);
    const [selectedTaskCopy, setSelectedTaskCopy] = useState(undefined);

    useEffect(() => {
        if (selectedTask) {
            setSelectedTaskCopy(JSON.parse(JSON.stringify(selectedTask)));
        }
    }, [selectedTask, setSelectedTaskCopy]);

    return selectedTaskCopy ? (
        <div className="container">
            <h2 className="title">Task Info</h2>
            <form action="#" method="post">
                <div className="id_info_container">
                    <InfoContainer
                        label="ID"
                        info_render={
                            <div className="info">{selectedTaskCopy.id}</div>
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
                            <button
                                className="btn btn-submit"
                                onClick={(e) => e.preventDefault()}
                            >
                                Assign more
                                <AiOutlineUserAdd />
                            </button>
                            {selectedTaskCopy.assignees.map((assignee) => (
                                <AssigneeButton
                                    key={assignee.id}
                                    taskPerson={assignee}
                                />
                            ))}
                        </div>
                    }
                />
                <InfoContainer
                    label="Priority"
                    info_render={<PriorityInfo task={selectedTaskCopy} />}
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
                    info_render={<StatusInfo task={selectedTaskCopy} />}
                />
                <div className="button_group">
                    <button type="submit" className="btn btn-submit">
                        <MdSave className="btn_icon" color="white" />
                        Update
                    </button>
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
                        <MdDeleteForever className="btn_icon" color="darkred" />
                        Delete Task
                    </button>
                </div>
            </form>
        </div>
    ) : (
        <div>No Item Selected</div>
    );
};

export default TaskInfo;
