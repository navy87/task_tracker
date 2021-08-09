import React from "react";

import { AiOutlineUserAdd } from "react-icons/ai";
import { MdDeleteForever, MdSave, MdAlarm } from "react-icons/md";
import InfoContainer from "../InfoContainer";
import PriorityInfo from "./PriorityInfo";
import StatusInfo from "./StatusInfo";

const TaskInfo = () => {
    return (
        <div className="container">
            <h2 className="title">Task Info</h2>
            <form action="#" method="post">
                <div className="id_info_container">
                    <InfoContainer
                        label="ID"
                        info_render={<div className="info">1250</div>}
                    />
                    <InfoContainer
                        label="Creation Date"
                        info_render={<div className="info">Aug. 1, 2021</div>}
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
                            placeholder="Issue"
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
                        ></textarea>
                    }
                />
                <InfoContainer
                    label="Assigned To"
                    info_render={
                        <div>
                            <button
                                className="btn btn-submit"
                                onClick={(e) => e.preventDefault()}
                            >
                                Assign more
                                <AiOutlineUserAdd />
                            </button>
                        </div>
                    }
                />
                <InfoContainer
                    label="Priority"
                    info_render={<PriorityInfo />}
                />
                <InfoContainer
                    label="Due Date"
                    htmlFor="info_due_date"
                    info_render={
                        <input id="info_due_date" type="date" name="due_date" />
                    }
                />
                <InfoContainer label="Status" info_render={<StatusInfo />} />
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
    );
};

export default TaskInfo;
