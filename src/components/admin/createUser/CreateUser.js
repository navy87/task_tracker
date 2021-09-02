import React, {useState, useContext} from "react";
import toast from "react-hot-toast";
import {getUserURL} from "../../../helpers/Helper";
import axios from "axios";
import RoleSelect from "./RoleSelect";
import DepartmentSelect from "./DepartmentSelect";
import {GlobalContext} from "../../../contexts/GlobalContext";
import {QuestionDialog} from "../../../helpers/Dialog";

const CreateUser = ({match}) => {
    const emptyUserMeta = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: {
            id: null,
            name: ""
        },
        departmentTitle: "",
        role: {
            id: null,
            name: ""
        },
    };
    const {setDialog} = useContext(GlobalContext)
    const [userMeta, setUserMeta] = useState(emptyUserMeta);
    const [confirmPassword, setConfirmPassword] = useState("");

    const createUser = async () => {
        const url = getUserURL();
        try {
            const res = await axios.post(url, JSON.stringify(userMeta));
            if (res.status === 200) {
                toast.success("User has been saved!", {
                    duration: 5000,
                });
                setUserMeta(emptyUserMeta);
                setConfirmPassword("");
            }
        } catch (e) {
            console.error(e)
            toast.error("There was an error.", {duration: 5000});
        }
    }

    const handleCreateUser = (e) => {
        e.preventDefault();

        if (confirmPassword !== userMeta.password) {
            toast.error("Password doesn't match!", {
                position: "top-center",
                autoClose: 5000,
            });
            return;
        }
        console.log(userMeta)
        if (userMeta.role.name === "USER") {
            createUser();
        } else {
            setDialog(
                <QuestionDialog
                    text={`Elevated Privileges?`}
                    subtext={`Are you sure? Do you want to make this user a ${userMeta.role.name}?`}
                    title="Just Checking"
                    onYes={createUser}
                    onNo={() => true}
                    closeAfterwards={true}
                />
            );
        }
    };

    return (
        <div className="create-user-container">
            <h2>New User Information</h2>
            <form
                id="create-user-form"
                method="POST"
                onSubmit={handleCreateUser}
            >
                <h3 className="form-subtitle">Personal Information</h3>
                <input
                    type="text"
                    required
                    autoComplete="off"
                    autoCorrect="off"
                    name="firstName"
                    placeholder="First Name"
                    value={userMeta.firstName}
                    onChange={(e) =>
                        setUserMeta((current) => ({
                            ...current,
                            firstName: e.target.value,
                        }))
                    }
                />
                <input
                    type="text"
                    required
                    autoComplete="off"
                    autoCorrect="off"
                    placeholder="Last Name"
                    name="lastName"
                    value={userMeta.lastName}
                    onChange={(e) =>
                        setUserMeta((current) => ({
                            ...current,
                            lastName: e.target.value,
                        }))
                    }
                />
                <input
                    type="email"
                    required
                    autoComplete="off"
                    autoCorrect="off"
                    placeholder="Email"
                    name="email"
                    value={userMeta.email}
                    onChange={(e) =>
                        setUserMeta((current) => ({
                            ...current,
                            email: e.target.value,
                        }))
                    }
                />
                <input
                    type="tel"
                    required
                    autoComplete="off"
                    placeholder="Phone Number"
                    name="phone"
                    value={userMeta.phone}
                    onChange={(e) =>
                        setUserMeta((current) => ({
                            ...current,
                            phone: e.target.value,
                        }))
                    }
                />
                <h3 className="form-subtitle">Department Information</h3>
                <DepartmentSelect userMeta={userMeta} setUserMeta={setUserMeta} />
                <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="Title"
                    name="title"
                    autoCorrect="off"
                    value={userMeta.departmentTitle}
                    onChange={e => setUserMeta(current =>({...current, departmentTitle: e.target.value}))}
                />
                <h3 className="form-subtitle">Security Information</h3>
                <RoleSelect userMeta={userMeta} setUserMeta={setUserMeta}  />
                <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="Username"
                    name="username"
                    autoCorrect="off"
                    value={userMeta.username}
                    onChange={(e) =>
                        setUserMeta((current) => ({
                            ...current,
                            username: e.target.value,
                        }))
                    }
                />
                <input
                    type="password"
                    required
                    autoComplete="off"
                    placeholder="Password"
                    name="password"
                    autoCorrect="off"
                    value={userMeta.password}
                    onChange={(e) =>
                        setUserMeta((current) => ({
                            ...current,
                            password: e.target.value,
                        }))
                    }
                />

                <input
                    type="password"
                    required
                    autoComplete="off"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    autoCorrect="off"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <input type="submit" value="Sign Up"/>
            </form>
        </div>
    );
};

export default CreateUser;
