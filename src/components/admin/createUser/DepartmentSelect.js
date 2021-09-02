import React, {useEffect, useState } from "react"
import {fetchingErrorHandler, getDepartmentURL} from "../../../helpers/Helper";
import axios from "axios";

const DepartmentSelect = ({setUserMeta, userMeta}) => {

    const [departments, setDepartments] = useState([])

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const url = getDepartmentURL();
                const res = await axios.get(url);
                return res.data;
            } catch (e) {
                throw e
            }
        }

        fetchRoles()
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