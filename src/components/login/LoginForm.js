import React from "react";

const LoginForm = ({ match }) => {
    const handleLogin = (e) => {
        e.preventDefault();
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
                />
                <input
                    type="password"
                    required
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
                <a href={`${match.url}/forgotPassword`} id="id-forgot-password">
                    Forgot Password
                </a>
            </form>
        </>
    );
};

export default LoginForm;
