import React, { useEffect, useState } from "react";
import DepartmentsList from "./DepartmentsList";
import {
    fetchingErrorHandler,
    getDepartmentURL,
} from "../../../helpers/Helper";
import axios from "axios";
import { useParams } from "react-router-dom";

const Department = () => {
    const [departmentList, setDepartmentList] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState({
        id: null,
        name: "",
    });
    const [refresh, setRefresh] = useState(true);

    const params = useParams();
    const departmentId = params.id;
    const refreshDepartments = () => {
        setRefresh((current) => !current);
    };

    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const url = getDepartmentURL(departmentId);
                const res = await axios.get(url);
                return res.data;
            } catch (e) {
                console.error(e);
            }
        };

        if (departmentId) {
            fetchDepartment().then(setSelectedDepartment);
        } else {
            setSelectedDepartment({ id: null, name: "" });
        }
    }, [departmentId, setSelectedDepartment]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const url = getDepartmentURL();
                const res = await axios.get(url);
                if (res.status === 200) {
                    setDepartmentList(res.data);
                }
            } catch (e) {
                fetchingErrorHandler(e);
            }
        };
        fetchDepartments().then(null);
    }, [refresh, setDepartmentList]);

    return (
        <div className={"department-container"}>
            {/*<DepartmentForm*/}
            {/*    selectedDepartment={selectedDepartment}*/}
            {/*    setSelectedDepartment={setSelectedDepartment}*/}
            {/*    refreshDepartments={refreshDepartments}*/}
            {/*/>*/}
            <DepartmentsList
                departmentsList={departmentList}
                selectedDepartment={selectedDepartment}
                setSelectedDepartment={setSelectedDepartment}
                refreshDepartments={refreshDepartments}
            />
        </div>
    );
};

export default Department;
