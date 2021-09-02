import React, {useContext, useEffect, useState} from "react";
import {checkUserExists, getChangeRoleURL, getRoleURL, getUserByUsername} from "../../helpers/Helper";
import toast from "react-hot-toast";
import axios from "axios";
import {QuestionDialog} from "../../helpers/Dialog";
import {GlobalContext} from "../../contexts/GlobalContext";

const ChangeRole = () => {
    const { setDialog } = useContext(GlobalContext)
    const [username, setUsername] = useState("")
    const [selectedRole, setSelectedRole] = useState("")
    const [roles, setRoles] = useState([])

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const url = getRoleURL();
                const res = await axios.get(url);
                return res.data;
            } catch (e) {
                throw e
            }
        }
        fetchRoles()
            .then(setRoles)
    }, [setRoles])

    const changeRole = async () => {
        try {
            const url = getChangeRoleURL(username);
            const response = await axios.patch(url, null, {
                params: {
                    roleName: selectedRole
                }
            })
            if (response.status === 200) {
                toast.success(`Role for the user has been changed to ${response.data.name} successfully.`, {
                    duration: 5000
                })
                setUsername("")
                setSelectedRole("")
            }
        } catch (e) {
            console.error(e)
        }
    }

    const handleChangeRole = async (e) => {
        e.preventDefault()
        const exists = await checkUserExists(username);
        if (!exists) {
            toast.error(`No User account exists with the username provided.`, {
                duration: 5000
            })
            return;
        }
        const user = await getUserByUsername(username)
        console.log(user)
        if (user.role && user.role.name === selectedRole) {
            toast.error(`This user's already has a ${selectedRole} role.`, {duration: 5000})
            return;
        }
        let subtext = ""
        if (selectedRole === "USER") {
           subtext = "Do you want to take away admin privileges from this user? You can always change this back."
        } else {
            subtext = "Do you want to give admin privileges to this user? You can always change this back."
        }
        setDialog(
            <QuestionDialog
                text={`Change Role?`}
                subtext={subtext}
                title="Just Checking"
                onYes={changeRole}
                onNo={() => true}
                closeAfterwards={true}
            />
        )
    }

    return (
        <div className="deactivate_account_container">
            <h2>{`Change Role for Account`}</h2>
            <form
                id="id_deactivate_account_form"
                method="POST"
                onSubmit={handleChangeRole}
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

                <select name={"role"}
                        required={true}
                        value={selectedRole}
                        onChange={event => setSelectedRole(event.target.value)}
                >
                    <option value={""}>Select new role</option>
                    {roles.map((role, index) => (
                        <option value={role.name} key={index}>{role.name}</option>
                    ))}
                </select>

                <input type="submit" value={`Change Role`}/>
            </form>
        </div>
    );
}

export default ChangeRole;