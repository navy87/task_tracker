import React, { useContext } from "react";
import { GlobalContext } from "../../../../contexts/GlobalContext";
import { QuestionDialog } from "../../../../helpers/Dialog";
import { MdDeleteForever, MdSave } from "react-icons/md";
import InfoContainer from "../InfoContainer";
import PriorityInfo from "./PriorityInfo";
import StatusInfo from "./StatusInfo";
import toast from "react-hot-toast";
import { getTaskURL } from "../../../../helpers/Helper";
import { DataContext } from "../../../../contexts/SidebarContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AssigneesRow from "./AssigneesRow";

const TaskForm = ({ selectedTask, setSelectedTask, isOwner }) => {
    const { setDialog } = useContext(GlobalContext);
    const { refresh, setSelectedTask: setSelectedTaskGlobal } =
        useContext(DataContext);

    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const assignees = selectedTask.assignees;
        if (assignees.length === 0) {
            toast.error("There must be at least one assignee.", {
                position: "top-center",
                duration: 5000,
            });
            return;
        }

        const url = selectedTask.id
            ? getTaskURL(selectedTask.id)
            : getTaskURL();

        try {
            const res = await axios(url, {
                method: !selectedTask.id ? "POST" : "PUT",
                data: JSON.stringify(selectedTask),
            });
            if (res.status !== 200) {
                console.error(res);
            } else {
                refresh();
                toast.success("Task has been saved!", {
                    duration: 5000,
                });
                const data = res.data;
                const id = data.id;
                navigate(`/task/${id}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("There was an error.", {
                duration: 5000,
            });
        }
    };

    const deleteTask = () => {
        const url = getTaskURL(selectedTask.id);

        const fetchDelete = async () => {
            try {
                const res = await axios.delete(url);
                if (res.status === 200) {
                    toast.success("Task has been deleted!", {
                        duration: 5000,
                    });
                } else {
                    console.error(res.data);
                    toast.error("There was an error deleting task.", {
                        duration: 5000,
                    });
                }
            } catch (error) {
                console.error(error);
                toast.error("There was an error deleting task.", {
                    duration: 5000,
                });
            }
        };
        fetchDelete().then(() => {
            setSelectedTaskGlobal({ id: null });
            navigate("/");
            refresh();
        });
    };

    const handleTaskDelete = (e) => {
        e.preventDefault();
        setDialog(
            <QuestionDialog
                text="Delete Task?"
                subtext="Are you sure? This action can not be undone."
                title="Just Checking"
                onYes={deleteTask}
                onNo={() => true}
                closeAfterwards={true}
            />
        );
    };
    return (
        <div className="container">
            <h2 className="title">
                Task Info
                {selectedTask.id !== 0 || <span className="new">New</span>}
            </h2>
            <form onSubmit={handleFormSubmit} action="#" method="post">
                <div className="id_info_container">
                    <InfoContainer
                        label="ID"
                        info_render={
                            <div className={`info ${selectedTask.id || "new"}`}>
                                {selectedTask.id || "New"}
                            </div>
                        }
                    />
                    <InfoContainer
                        label="Creation Date"
                        info_render={
                            <div className="info">
                                {new Date(
                                    selectedTask.addedDate
                                ).toDateString()}
                                {", "}
                                {new Date(
                                    selectedTask.addedDate
                                ).toLocaleTimeString()}
                            </div>
                        }
                    />
                </div>
                <InfoContainer
                    label={"Creator"}
                    info_render={
                        <div className={`info owner`}>
                            {selectedTask.owner
                                ? selectedTask.owner.fullName.toUpperCase()
                                : "Self"}
                        </div>
                    }
                />
                <InfoContainer
                    label="Issue"
                    htmlFor="info_name"
                    info_render={
                        <input
                            id="info_name"
                            type="text"
                            name="name"
                            autoComplete="off"
                            placeholder="Issue"
                            value={selectedTask.issue}
                            required
                            onChange={(e) => {
                                setSelectedTask({
                                    ...selectedTask,
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
                            value={selectedTask.description}
                            required
                            onChange={(e) => {
                                setSelectedTask({
                                    ...selectedTask,
                                    description: e.target.value,
                                });
                            }}
                        />
                    }
                />
                <InfoContainer
                    label="Assigned To"
                    info_render={
                        <AssigneesRow
                            isOwner={isOwner}
                            selectedTask={selectedTask}
                            setSelectedTask={setSelectedTask}
                        />
                    }
                />
                <InfoContainer
                    label="Priority"
                    info_render={
                        <PriorityInfo
                            selectedTask={selectedTask}
                            setSelectedTask={setSelectedTask}
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
                            value={selectedTask.dueDate}
                            required
                            onChange={(e) => {
                                setSelectedTask({
                                    ...selectedTask,
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
                            selectedTask={selectedTask}
                            setSelectedTask={setSelectedTask}
                        />
                    }
                />
                <div className="button_group">
                    <button
                        type="submit"
                        disabled={!isOwner}
                        className="btn btn-submit"
                    >
                        <MdSave className="btn_icon" />
                        {(selectedTask.id && "Update") || "Add"}
                    </button>
                    {selectedTask.id === 0 || (
                        <>
                            {/* <button
                                onClick={handleRemindAssignees}
                                className="btn btn-info"
                            >
                                <MdAlarm className="btn_icon" color="black" />
                                Remind Assignees
                            </button> */}
                            <button
                                onClick={handleTaskDelete}
                                className="btn btn-danger"
                                disabled={!isOwner}
                            >
                                <MdDeleteForever className="btn_icon" />
                                Delete Task
                            </button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default TaskForm;
