import React, {useContext, useState} from "react";
import axios from "axios";
import {getUserActivateURL, getUserDeactivateURL, getUserExistsURL} from "../../helpers/Helper";
import {GlobalContext} from "../../contexts/GlobalContext";
import {QuestionDialog} from "../../helpers/Dialog";
import toast from "react-hot-toast";

const ActivateDeactivateAccount = ({activate = false, deactivate=false}) => {
    const { setDialog } = useContext(GlobalContext)
    const [username, setUsername] = useState("")

    const checkUserExists = async () => {
        try {
            console.log(getUserExistsURL(username))
            const response = await axios.get(getUserExistsURL(username))
            if (response.status === 200) {
                return response.data
            }
        } catch (e) {
            console.error(e)
        }
        return false;
    }

    const changeStatus = async () => {
        try {
            const url = activate ? getUserActivateURL(username) : getUserDeactivateURL(username)
            const response = await axios.patch(url);
            if (response.status === 200) {
                toast.success(`This account has been ${activate ? "activated" : "deactivated"} successfully`, {
                    duration: 5000
                })
            }
        } catch (e) {
            console.error(e)
        }
    }

    const handleAccountStatusChange = async (e) => {
        e.preventDefault();
        const exists = await checkUserExists();
        if (!exists) {
            toast.error(`No User account exists with the username provided.`, {
                duration: 5000
            })
            return;
        }
        const subtext = activate ?
            "Are you sure you want to activate this user? User will be able to do all the things they were able to do." :
            "Are you sure you want to deactivate this user? User won't be able to access their account any more."
        setDialog(
            <QuestionDialog
                text={`${activate ? "Activate" : "Deactivate"} Account?`}
                subtext={subtext}
                title="Just Checking"
                onYes={changeStatus}
                onNo={() => true}
                closeAfterwards={true}
            />
        )

    };
    return (
        <div className="deactivate_account_container">
            <h2>{`${activate ? "Activate" : "Deactivate"} Account`}</h2>
            <form
                id="id_deactivate_account_form"
                method="POST"
                onSubmit={handleAccountStatusChange}
            >
                <input
                    type="text"
                    required
                    autoComplete="off"
                    placeholder="Username"
                    autoCorrect="off"
                    name={"username"}
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
                <input type="submit" value={`${activate ? "Activate" : "Deactivate"} Account`}/>
            </form>
        </div>
    );
};

export default ActivateDeactivateAccount;
