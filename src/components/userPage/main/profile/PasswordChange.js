import React, {useContext, useEffect, useState} from "react"
import {fetchingErrorHandler, getChangePasswordURL} from "../../../../helpers/Helper";
import axios from "axios";
import {GlobalContext} from "../../../../contexts/GlobalContext";
import toast from "react-hot-toast";
import {Link, useHistory} from "react-router-dom";

const PasswordChange = () => {
    const [username, setUsername] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    const {userRefreshed} = useContext(GlobalContext);
    const history = useHistory()

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        setUser(user)
    }, [userRefreshed])

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (user.username.toLowerCase() !== username.toLowerCase()) {
            toast.error("You have entered a wrong username.", {duration: 5000})
            return
        }
        if (confirmPassword !== newPassword) {
            toast.error("New Password and Confirmed Password doesn't match.", {duration: 5000})
            return
        }
        try {
            const url = getChangePasswordURL()
            const res = await axios.patch(url, {currentPassword, newPassword}, {
                params: {username}
            })
            if (res.status === 200) {
                toast.success("Your new password has been set.", {duration: 5000})
                history.push("/profile")
            }
        } catch (e) {
            if (e.response.status === 502) { // Bad Gateway
                toast.error("Password could not set. You have entered a wrong current password.", {duration: 5000})
            } else {
                fetchingErrorHandler(e)
            }
        }
    }

    return <div className={"container"}>
        <h2 className={"title"}>Change Password</h2>
        <form className={"change-password-form"} onSubmit={handlePasswordChange}>
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
            <input
                type="password"
                required
                autoComplete="off"
                placeholder="Current Password"
                autoCorrect="off"
                name={"currentPassword"}
                value={currentPassword}
                onChange={event => setCurrentPassword(event.target.value)}
            />
            <input
                type="password"
                required
                autoComplete="off"
                placeholder="New Password"
                autoCorrect="off"
                name={"newPassword"}
                value={newPassword}
                onChange={event => setNewPassword(event.target.value)}
            />
            <input
                type="password"
                required
                autoComplete="off"
                placeholder="Confirm New Password"
                autoCorrect="off"
                name={"confirmPassword"}
                value={confirmPassword}
                onChange={event => setConfirmPassword(event.target.value)}
            />
            <button type={"submit"}>Change Password</button>
        </form>
        <div style={{display: "block", borderTop: "1px solid #888", marginTop:"1rem", paddingBottom: ".5rem"}}/>
        <Link className="edit-link" to={`/profile`}>
            Back To Show Profile
        </Link>
    </div>
}

export default PasswordChange;