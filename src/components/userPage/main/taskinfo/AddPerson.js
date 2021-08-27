import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { GlobalContext } from "../../../../contexts/GlobalContext";
import { DataContext } from "../../../../contexts/SidebarContext";
import { getProfileURL } from "../../../helpers/Helper";

const AddPerson = ({ selectedTask, setSelectedTask }) => {
    const { setDialog } = useContext(GlobalContext);
    const { refresh } = useContext(DataContext);
    // const { people } = useContext(DataContext);

    const [newPerson, setNewPerson] = useState({ id: 0, name: "", email: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        setDialog(null);

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPerson),
        };

        // const url = `http://localhost:4200/api/person/`;

        fetch(getProfileURL(), requestOptions)
            .then((res) => {
                if (res.ok) {
                    refresh();
                    toast.success("Person has been saved!", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                    return res.json();
                } else {
                    toast.error("Something went wrong!", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                }
            })
            .then((data) => {
                // console.log(data);
                // console.log(people);
                // const savedPerson = [...people].filter(
                //     (person) => person.id === data.id
                // );
                // console.log(savedPerson);
                // const assignees = [...selectedTask.assignees];
                // setSelectedTask({ ...selectedTask, assignees });
                // setNewPerson(DeepCopy(emptyPerson));
            })
            .catch((err) =>
                toast.error("There was an error.", {
                    position: "top-center",
                    autoClose: 5000,
                })
            );
    };
    return (
        <div className="edit_form_container alone">
            <h3>
                Person Detail <span className="new">New</span>
            </h3>
            <form
                onSubmit={handleSubmit}
                className="edit_form"
                method="POST"
                action="#"
            >
                <input
                    id="id_person_name"
                    type="text"
                    name="full_name"
                    autoComplete="off"
                    value={newPerson.name}
                    onChange={(e) =>
                        setNewPerson({
                            ...newPerson,
                            name: e.target.value,
                        })
                    }
                    placeholder="Full Name"
                    required
                />
                <input
                    id="id_person_email"
                    type="email"
                    name="email"
                    autoComplete="off"
                    placeholder="Email"
                    value={newPerson.email}
                    onChange={(e) =>
                        setNewPerson({
                            ...newPerson,
                            email: e.target.value,
                        })
                    }
                />
                <div className="button-container">
                    <button className="btn btn-submit">Add Person</button>
                </div>
            </form>
        </div>
    );
};

export default AddPerson;
