import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GiRadioactive } from "react-icons/gi";
import { MdEmail, MdPerson } from "react-icons/md";
import { GlobalContext } from "../../../../contexts/GlobalContext";
import { DataContext } from "../../../../contexts/SidebarContext";
import { DeepCopy, getProfileURL } from "../../../../helpers/Helper";
import PersonDialog from "./PersonDialog";
import Dialog, { QuestionDialog } from "../../../../helpers/Dialog";
import axios from "axios";

const PersonItem = ({ currentPerson, setCurrentPerson, selected }) => {
    const { tasks, refresh } = useContext(DataContext);
    const { setDialog } = useContext(GlobalContext);
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

    const deletePerson = async () => {
        const url = getProfileURL(currentPerson.id);
        try {
            const res = await axios.delete(url);
            if (res.status === 200) {
                refresh();
                toast.success("Person has been removed!", {
                    duration: 5000,
                });
            } else {
                console.log(res);
                toast.error("Something went wrong!", {
                    position: "top-center",
                    autoClose: 5000,
                });
            }
        } catch (e) {
            console.error(e)
            toast.error("There was an error deleting person.", {
                position: "top-center",
                autoClose: 5000,
            })
        }
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
                    deletePerson().then(null);
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
                <MdPerson className="icon" /> {currentPerson.fullName}
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
