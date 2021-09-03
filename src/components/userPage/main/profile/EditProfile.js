import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom";
import {FaUserCircle} from "react-icons/fa";
import {fetchDepartments, fetchingErrorHandler, getDepartment} from "../../../../helpers/Helper";

const EditProfile = ({match}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    const [departments, setDepartments] = useState([])
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        setUser(user)
        console.log("Rendered")
    }, [])

    useEffect(() => {
        fetchDepartments()
            .then(setDepartments)
            .catch(fetchingErrorHandler)
    }, [setDepartments])

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return <div className="container">
        <div className="title_pic_container">
            <div className="pic-container">
                <FaUserCircle className="profile_pic"/>
                <Link to="/" className="changePhoto">
                    Change Photo
                </Link>
            </div>
        </div>
        <form className={"profile-form"} onSubmit={handleSubmit}>
            <input
                type="text"
                required
                autoComplete="off"
                placeholder="First Name"
                autoCorrect="off"
                name={"firstName"}
                value={user.firstName}
                onChange={event => setUser(current => ({...current, firstName: event.target.value}))}
            />
            <input
                type="text"
                required
                autoComplete="off"
                placeholder="Last Name"
                autoCorrect="off"
                name={"lastName"}
                value={user.lastName}
                onChange={event => setUser(current => ({...current, lastName: event.target.value}))}
            />
            <input
                type="email"
                required
                autoComplete="off"
                placeholder="Email"
                autoCorrect="off"
                name={"email"}
                value={user.email}
                onChange={event => setUser(current => ({...current, email: event.target.value}))}
            />
            <input
                type="tel"
                required
                autoComplete="off"
                placeholder="Phone Number"
                autoCorrect="off"
                name={"phone"}
                value={user.phone}
                onChange={event => setUser(current => ({...current, phone: event.target.value}))}
            />
            <select required value={user.department.name}
                    onChange={event => setUser(current => ({...current, department: getDepartment(event.target.value, departments)}))}>
                <option value={""}>Select a Department</option>
                {departments.map((department, index) =>
                    <option value={department.name} key={index}>{department.name}</option>
                )}
            </select>
            <button type={"submit"}>Save</button>
        </form>
    </div>
}

export default EditProfile;