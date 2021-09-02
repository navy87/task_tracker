import axios from "axios";
import React, {useState} from "react";
import toast from "react-hot-toast";
import {useHistory} from "react-router-dom";
import {getLoginURL, getUserMetaURL} from "../../helpers/Helper";

const LoginForm = ({match, location}) => {
    const emptyForm = {
        username: "",
        password: "",
    };
    const [login, setLogin] = useState(emptyForm);

    const history = useHistory();

    const getUser = async (username) => {
        try {
            const res = await axios.get(getUserMetaURL(username))
            if (res.status === 200) {
                return res.data;
            } else {
                return null;
            }
        } catch (e) {
            console.error(e)
        }
        return null;
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const url = getLoginURL();
        try {
            const res = await axios.post(url, JSON.stringify(login))
            if (res.status === 200) {
                localStorage.setItem("token", res.headers.authorization)
                const userMeta = await getUser(login.username);
                console.log(userMeta)
                localStorage.setItem("user", JSON.stringify(userMeta))
                if (location.state) {
                    history.push(location.state.from);
                } else {
                    history.push("/");
                }
            }
        } catch (e) {
            console.error(e)
            toast.error("Username and/or Password is wrong.", {
                duration: 5000,
            });
        }
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
                {/*<label htmlFor="id_remember_me">*/}
                {/*    Remember Me*/}
                {/*    <input*/}
                {/*        id="id_remember_me"*/}
                {/*        type="checkbox"*/}
                {/*        name="remember-me"*/}
                {/*    />*/}
                {/*</label>*/}
                <input type="submit" value="Login"/>
                <a href={`${match.url}/forgotPassword`} id="id-forgot-password">
                    Forgot Password
                </a>
            </form>
        </>
    );
};

export default LoginForm;
