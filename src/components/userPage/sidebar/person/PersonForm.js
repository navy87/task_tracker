import React, { useContext } from "react";
import toast from "react-hot-toast";
import { DataContext } from "../../../contexts/SidebarContext";
import { DeepCopy, getProfileURL } from "../../helpers/Helper";
import axios from "axios";

const PersonForm = ({ currentPerson, setCurrentPerson }) => {
    const { refresh } = useContext(DataContext);

    const emptyPerson = {
        id: 0,
        name: "",
        email: "",
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestOptions = {
            method: !currentPerson.id ? "POST" : "PUT",
            data: JSON.stringify(currentPerson),
        };

        const url = currentPerson.id
            ? getProfileURL(currentPerson.id)
            : getProfileURL();

        try {
            const res = await axios(url, requestOptions);
            if (res.status === 200) {
                refresh();
                toast.success("Person has been saved!", {
                    duration: 5000,
                });
                setCurrentPerson(DeepCopy(emptyPerson))
            }
        } catch (e) {
            toast.error("There was an error.", {
                duration: 5000,
            })
        }
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
