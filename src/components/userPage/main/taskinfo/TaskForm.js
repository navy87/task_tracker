import React, { useContext } from "react";
import { GlobalContext } from "../../../../contexts/GlobalContext";
import { QuestionDialog } from "../../../../helpers/Dialog";
import { MdDeleteForever, MdSave } from "react-icons/md";
import InfoContainer from "../InfoContainer";
import AssigneeButton from "./AssigneeButton";
import PriorityInfo from "./PriorityInfo";
import SelectAssignees from "./SelectAssignees";
import StatusInfo from "./StatusInfo";
import toast from "react-hot-toast";
import { getTaskURL } from "../../../../helpers/Helper";
import { DataContext } from "../../../../contexts/SidebarContext";
import { useHistory } from "react-router-dom";

const TaskForm = ({ selectedTask, setSelectedTask }) => {
    const { setDialog } = useContext(GlobalContext);
    const { refresh, setSelectedTask: setSelectedTaskGlobal } =
        useContext(DataContext);

    const history = useHistory();

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const assignees = selectedTask.assignees;
        if (assignees.length === 0) {
            toast.error("There must be at least one assignee.", {
                position: "top-center",
                autoClose: 5000,
            });
            return;
        }

        const requestOptions = {
            method: !selectedTask.id ? "POST" : "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selectedTask),
        };

        const url = selectedTask.id
            ? getTaskURL(selectedTask.id)
            : getTaskURL();

        console.log("Before: ");
        console.log(selectedTask);
        fetch(url, requestOptions)
            .then((res) => {
                refresh();
                toast.success("Task has been saved!", {
                    position: "top-center",
                    autoClose: 5000,
                });
                return res.json();
            })
            .then((data) => {
                console.log("After: ");
                console.log(data);
                const id = data.id;
                history.push(`/task/${id}`);
            })
            .catch((err) =>
                toast.error("There was an error.", {
                    position: "top-center",
                    autoClose: 5000,
                })
            );
    };

    const deleteTask = () => {
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(selectedTask),
        };

        const url = getTaskURL(selectedTask.id);

        const fetchDelete = async () => {
            try {
                const res = await fetch(url, requestOptions);
                if (res.ok) {
                    toast.success("Task has been deleted!", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                }
            } catch (error) {
                console.log(error);
                toast.error("There was an error deleting task.", {
                    position: "top-center",
                    autoClose: 5000,
                });
            }
        };
        fetchDelete().then(() => {
            setSelectedTaskGlobal({ id: null });
            history.push("/");
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
                            <div className="info">{selectedTask.addedDate}</div>
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
                        ></textarea>
                    }
                />
                <InfoContainer
                    label="Assigned To"
                    info_render={
                        <div className="assignees_container">
                            <SelectAssignees
                                selectedTask={selectedTask}
                                setSelectedTask={setSelectedTask}
                            />

                            {selectedTask.assignees.map((assignee, index) => (
                                <AssigneeButton
                                    key={index}
                                    taskPerson={assignee}
                                    selectedTask={selectedTask}
                                    setSelectedTask={setSelectedTask}
                                />
                            ))}
                        </div>
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
                    <button type="submit" className="btn btn-submit">
                        <MdSave className="btn_icon" color="white" />
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
