import React, { useState } from "react";
import toast from "react-hot-toast";
import { getUserURL } from "../helpers/Helper";

const CreateUser = ({ match }) => {
    const emptyUserMeta = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    };
    const [userMeta, setUserMeta] = useState(emptyUserMeta);
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleCreateUser = (e) => {
        e.preventDefault();

        if (confirmPassword !== userMeta.password) {
            toast.error("Password doesn't match!", {
                position: "top-center",
                autoClose: 5000,
            });
            return;
        }

        console.log(userMeta);

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userMeta),
        };

        const url = getUserURL();

        fetch(url, requestOptions)
            .then((res) => {
                if (res.ok) {
                    toast.success("Task has been saved!", {
                        position: "top-center",
                        autoClose: 5000,
                    });
                    setUserMeta(emptyUserMeta);
                    setConfirmPassword("");
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) =>
                toast.error("There was an error.", {
                    position: "top-center",
                    autoClose: 5000,
                })
            );
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
                    value={userMeta.phone}
                    onChange={(e) =>
                        setUserMeta((current) => ({
                            ...current,
                            phone: e.target.value,
                        }))
                    }
                />
                <h3 className="form-subtitle">Security Information</h3>
                <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="Username"
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
                    autoCorrect="off"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <input type="submit" value="Sign Up" />
            </form>
        </div>
    );
};

export default CreateUser;