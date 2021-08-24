import React from "react";

const CreateUser = ({ match }) => {
    const handleCreateUser = (e) => {
        e.preventDefault();
    };
    return (
        <div className="create-user-container">
            <h2>New User Information</h2>
            <form
                id="create-user-form"
                method="POST"
                onSubmit={handleCreateUser}
            >
                <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="Username"
                    autoCorrect="off"
                />
                <input
                    type="text"
                    required
                    autoComplete="off"
                    autoCorrect="off"
                    placeholder="First Name"
                />
                <input
                    type="text"
                    required
                    autoComplete="off"
                    autoCorrect="off"
                    placeholder="Last Name"
                />
                <input
                    type="email"
                    required
                    autoComplete="off"
                    autoCorrect="off"
                    placeholder="Email"
                />
                <input
                    type="tel"
                    required
                    autoComplete="off"
                    placeholder="Phone Number"
                />

                <input type="submit" value="Sign Up" />
            </form>
        </div>
    );
};

export default CreateUser;
