import React from "react";

const ResetPassword = () => {
    return (
        <form className="form-container">
            <input
                type="password"
                required
                name="password"
                placeholder="New Password"
            />
            <input
                type="password"
                required
                name="confirm-password"
                placeholder="Confirm Password"
            />
            <input type="submit" value="Reset Password"/>
        </form>
    );
};

export default ResetPassword;
