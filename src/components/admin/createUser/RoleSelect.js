import React, {useEffect, useState} from "react"
import {fetchingErrorHandler, getRoleURL} from "../../../helpers/Helper";
import axios from "axios";

const RoleSelect = ({setUserMeta, userMeta}) => {

    const [roles, setRoles] = useState([])
    // const [selectedRole, setSelectedRole] = useState(process.env.REACT_APP_USER_ROLE)

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
            .catch(fetchingErrorHandler)
    }, [setRoles])

    const getRole = (name) => {
        const filtered = roles.filter(role => role.name === name);
        if (filtered.length === 0) return null
        return filtered[0]
    }
    // useEffect(() => {
    //     setUserMeta(current => ({...current, role: getRole()}))
    // }, [roles, selectedRole, setUserMeta])

    return (
        <select name={"role"} value={userMeta.role.name} onChange={e =>
            setUserMeta(current => ({...current, role: getRole(e.target.value)}))}
        >
            {
                roles.map((role, index) =>
                    <option value={role.name} key={index}>
                        {role.name}
                    </option>
                )
            }
        </select>
    )
}

export default RoleSelect;