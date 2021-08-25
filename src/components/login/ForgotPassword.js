import React from "react";
import { FiSend } from "react-icons/fi";

const ForgotPassword = () => {
    return (
        <div className="form-container">
            <div className="forgot-password-container">
                <input
                    type="text"
                    required
                    autoComplete="off"
                    name="forgotPasswordUsername"
                    placeholder="Username/Email/Phone"
                />
                <button>
                    <FiSend /> Send Code
                </button>
                {/* <input type="button" value="Send Code" /> */}
            </div>
            <input
                type="text"
                autoComplete="off"
                required
                name="code"
                placeholder="Code"
            />
            <input type="submit" value="Reset Password" />
        </div>
    );
};

export default ForgotPassword;
