import React, {useEffect, useState,} from "react"
import {fetchingErrorHandler, fetchRoles} from "../../../helpers/Helper";

const RoleSelect = ({setUserMeta, userMeta}) => {

    const [roles, setRoles] = useState([])

    const getRole = (name) => {
        const filtered = roles.filter(role => role.name === name);
        if (filtered.length === 0) return null
        return filtered[0]
    }

    useEffect(() => {
        fetchRoles()
            .then(setRoles)
            .catch(fetchingErrorHandler)
    }, [setRoles])

    return (
        <select name={"role"}
                required={true}
                value={userMeta.role.name}
                onChange={e => setUserMeta(current => ({...current, role: getRole(e.target.value)}))}
        >
            <option>Select a role</option>
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