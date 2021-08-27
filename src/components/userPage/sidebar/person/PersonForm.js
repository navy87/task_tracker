import React, { useContext } from "react";
import toast from "react-hot-toast";
import { DataContext } from "../../../contexts/SidebarContext";
import { DeepCopy, getProfileURL } from "../../helpers/Helper";

const PersonForm = ({ currentPerson, setCurrentPerson }) => {
    const { refresh } = useContext(DataContext);

    const emptyPerson = {
        id: 0,
        name: "",
        email: "",
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: !currentPerson.id ? "POST" : "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(currentPerson),
        };

        const url = currentPerson.id
            ? getProfileURL(currentPerson.id)
            : getProfileURL();

        fetch(url, requestOptions)
            .then((res) => {
                refresh();
                toast.success("Person has been saved!", {
                    position: "top-center",
                    autoClose: 5000,
                });
                return res.json();
            })
            .then((data) => {
                setCurrentPerson(DeepCopy(emptyPerson));
            })
            .catch((err) =>
                toast.error("There was an error.", {
                    position: "top-center",
                    autoClose: 5000,
                })
            );
    };

    return (
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
                value={currentPerson.name}
                onChange={(e) =>
                    setCurrentPerson({ ...currentPerson, name: e.target.value })
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
                value={currentPerson.email}
                onChange={(e) =>
                    setCurrentPerson({
                        ...currentPerson,
                        email: e.target.value,
                    })
                }
            />
            <div className="button-container">
                <button className="btn btn-submit">
                    {currentPerson.id === 0 ? "Add Person" : "Update"}
                </button>
            </div>
        </form>
    );
};

export default PersonForm;
