import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/GlobalContext";
import { getLoginURL } from "../../helpers/Helper";

const LoginForm = ({ match }) => {
    const emptyForm = {
        username: "",
        password: "",
    };
    const [login, setLogin] = useState(emptyForm);
    const { setAuth } = useContext(AuthContext);

    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(login);

        const requestOptions = {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                accept: "*/*",
            },
            body: JSON.stringify(login),
        };

        const url = getLoginURL();

        axios
            .post(url, JSON.stringify(login), requestOptions)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.headers["authorization"]);
                    setAuth({
                        authenticated: true,
                        token: res.headers["authorization"],
                    });
                    history.push("/");
                } else {
                    toast.error("Username and/or Password is wrong.", {
                        autoClose: 5000,
                    });
                }
            })
            .catch((error) => {
                console.error("There has been an error: ");
                console.log(error);
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
