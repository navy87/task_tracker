import React, { useState } from "react";
import toast from "react-hot-toast";
import { getLoginURL } from "../helpers/Helper";

const LoginForm = ({ match }) => {
    const emptyForm = {
        username: "",
        password: "",
    };
    const [login, setLogin] = useState(emptyForm);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(login);

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accept: "*/*",
            },
            body: JSON.stringify(login),
        };

        const url = getLoginURL();

        fetch(url, requestOptions)
            .then((res) => {
                for (const header of res.headers) {
                    console.log(header);
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error("There was an error.", {
                    position: "top-center",
                    autoClose: 5000,
                });
            });
    };

    return (
        <>
            <form
                className="form-container"
                method="POST"
                onSubmit={handleLogin}
            >
                <input
                    type="text"
                    required
                    name="username"
                    placeholder="Username"
                    autoComplete="off"
                    value={login.username}
                    onChange={(e) =>
                        setLogin((current) => ({
                            ...current,
                            username: e.target.value,
                        }))
                    }
                />
                <input
                    type="password"
                    required
                    name="password"
                    placeholder="Password"
                    autoComplete="off"
                    value={login.password}
                    onChange={(e) =>
                        setLogin((current) => ({
                            ...current,
                            password: e.target.value,
                        }))
                    }
                />
                <label htmlFor="id_remember_me">
                    Remember Me
                    <input
                        id="id_remember_me"
                        type="checkbox"
                        name="remember-me"
                    />
                </label>
                <input type="submit" value="Login" />
                <a href={`${match.url}/forgotPassword`} id="id-forgot-password">
                    Forgot Password
                </a>
            </form>
        </>
    );
};

export default LoginForm;
