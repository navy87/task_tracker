import React from "react";

const DeactivateAccount = () => {
    const handleDeactivateAccount = (e) => {
        e.preventDefault();
    };
    return (
        <div className="deactivate_account_container">
            <h2>Deactivate Account</h2>
            <form
                id="id_deactivate_account_form"
                method="POST"
                onSubmit={handleDeactivateAccount}
            >
                <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="Username"
                    autoCorrect="off"
                />
                <input type="submit" value="Deactivate Account"/>
            </form>
        </div>
    );
};

export default DeactivateAccount;
