import React, {useContext, useState} from "react";
import {GlobalContext} from "../../contexts/GlobalContext";
import axios from "axios";
import {checkUserExists, getUserResetPassword} from "../../helpers/Helper";
import toast from "react-hot-toast";
import {QuestionDialog} from "../../helpers/Dialog";

const ResetPasswordAdmin = ({match}) => {
    const [username, setUsername] = useState("")
    const {setDialog} = useContext(GlobalContext)

    const resetPassword = async () => {
        try {
            const url = getUserResetPassword()
            const response = await axios.put(url, null, {
                params: {username}
            })
            if (response.status === 200) {
                toast.success(`Password has been reset for ${username} successfully.`, {duration: 5000})
                toast(`The new password for ${username} is passwordReset${username.toLowerCase()}`, {duration: 5000})
            }
        } catch (e) {
            console.error(e)
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const exists = await checkUserExists(username);
        if (!exists) {
            toast.error(`No User account exists with the username provided.`, {
                duration: 5000
            })
            return;
        }

        const subtext = `Are you sure you want to reset the password for ${username}. This action can only be done at the request of the user.`

        setDialog(
            <QuestionDialog
                text={`Reset Password?`}
                subtext={subtext}
                title="Just Checking"
                onYes={resetPassword}
                onNo={() => true}
                closeAfterwards={true}
            />
        )
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
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
                <input type="submit" value="Reset Password"/>
            </form>
        </div>
    );
};

export default ResetPasswordAdmin;
