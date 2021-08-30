import React from "react";

const ResetPasswordAdmin = ({match}) => {
    const handleResetPassword = (e) => {
        e.preventDefault();
    };

    return (
        <div className="reset_password_container">
            <h2>Reset Password</h2>
            <form
                id="id_reset_password_form"
                method="POST"
                onSubmit={handleResetPassword}
            >
                <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="Username"
                    autoCorrect="off"
                />
                <input type="submit" value="Reset Password"/>
            </form>
        </div>
    );
};

export default ResetPasswordAdmin;
