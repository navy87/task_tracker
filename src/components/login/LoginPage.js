import React from "react";
import { FcPlanner } from "react-icons/fc";
import "../../styles/login/login.css";

const LoginPage = () => {
    const handleLogin = (e) => {
        e.preventDefault();
    };

    return (
        <div id="id_login_page">
            <div className="container">
                <div className="logo-container">
                    <FcPlanner className="logo" />
                    <h1>Task Tracker</h1>
                </div>
                <form method="POST" onSubmit={handleLogin}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        autoComplete="off"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="off"
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
                </form>
                <a href="/login" id="id-forgot-password">
                    Forgot Password
                </a>
            </div>
        </div>
    );
};

export default LoginPage;
