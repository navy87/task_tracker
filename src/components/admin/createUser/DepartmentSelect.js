import React, {useEffect, useState} from "react"
import {fetchDepartments, fetchingErrorHandler, } from "../../../helpers/Helper";

const DepartmentSelect = ({setUserMeta, userMeta}) => {

    const [departments, setDepartments] = useState([])

    useEffect(() => {
        fetchDepartments()
            .then(data => {
                setDepartments(data);
            })
            .catch(fetchingErrorHandler)
    }, [setDepartments])

    const getDepartment = (name) => {
        const filtered = departments.filter(department => department.name === name)
        if (filtered.length === 0) {
            return null;
        }
        return filtered[0]
    }

    return (
        <select
            name={"department"}
            value={userMeta.department.name}
            onChange={e =>
                setUserMeta(current => ({...current, department: getDepartment(e.target.value)}))
            }
            required
        >
            <option value={""}>Select a Department</option>
            {
                departments.map((department, index) =>
                    <option value={department.name} key={index}>
                        {department.name}
                    </option>
                )
            }
        </select>
    )
}

export default DepartmentSelect;