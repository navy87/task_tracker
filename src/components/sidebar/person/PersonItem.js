import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GiRadioactive } from "react-icons/gi";
import { MdEmail, MdPerson } from "react-icons/md";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { DataContext } from "../../../contexts/SidebarContext";
import { DeepCopy, getProfileURL } from "../../helpers/Helper";
import PersonDialog from "./PersonDialog";
import Dialog, { QuestionDialog } from "../../helpers/Dialog";

const PersonItem = ({ currentPerson, setCurrentPerson, selected }) => {
    const { tasks } = useContext(DataContext);
    const { refresh, setDialog } = useContext(GlobalContext);
    const [actives, setActives] = useState(0);

    useEffect(() => {
        if (tasks) {
            const size = [...tasks].filter((task) => {
                const ids = [...task.assignees].map(
                    (assignee) => assignee.person.id
                );
                return ids.includes(currentPerson.id);
            }).length;
            setActives(size);
        }
    }, [tasks, setActives, currentPerson]);

    const handleEdit = (e) => {
        e.preventDefault();
        setCurrentPerson(DeepCopy(currentPerson));
    };

    const deletePerson = () => {
        const requestOptions = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        };

        const url = getProfileURL(currentPerson.id);

        fetch(url, requestOptions)
            .then((res) => {
                if (res.ok) {
                    res.text();
                    refresh();
                    toast.success("Person has been removed!", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                } else {
                    toast.error("Something went wrong!", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                }
            })
            .then((data) => console.log(data))
            .catch((err) =>
                toast.error("There was an error deleting person.", {
                    position: "top-center",
                    autoClose: 5000,
                })
            );
    };

    const openPersonDialog = () => {
        setDialog(<Dialog render={<PersonDialog />} />);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        setDialog(
            <QuestionDialog
                text={`Delete ${currentPerson.name}?`}
                subtext="Are you sure? This action can not be undone."
                title="Just Checking"
                onYes={() => {
                    deletePerson();
                    openPersonDialog();
                }}
                onNo={() => openPersonDialog()}
                closeAfterwards={false}
            />
        );
    };

    return (
        <div className={`person_item ${selected && "selected"}`}>
            <div className="info">
                <MdPerson className="icon" /> {currentPerson.name}
            </div>
            <div className="info">
                <MdEmail className="icon" />
                {currentPerson.email ? (
                    currentPerson.email
                ) : (
                    <span className="no-email">No Email Address</span>
                )}
            </div>
            <div className="info">
                <GiRadioactive className="icon" /> {actives} Active Tasks
            </div>
            <div className="info buttons">
                <button onClick={handleEdit}>Edit</button>
                <button className="delete" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default PersonItem;
