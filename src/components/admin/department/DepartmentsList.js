import React, {useState} from "react";
import DepartmentItem from "./DepartmentItem";

const DepartmentsList = ({departmentsList, selectedDepartment, setSelectedDepartment, refreshDepartments}) => {
    const [isAdding, setIsAdding] = useState(false);

    return <div className={"department-list-container"}>
        <h2>Departments</h2>
        {departmentsList.map((department, index) => (
            <DepartmentItem
                key={index}
                department={department}
                refreshDepartments={refreshDepartments}
                isNew={false}
                setIsAdding={setIsAdding}
            />)
        )
        }
        {isAdding &&
        <DepartmentItem
            department={{id: null, name: ""}}
            refreshDepartments={refreshDepartments}
            isNew={true}
            setIsAdding={setIsAdding}
        />
        }
        {!isAdding &&
        (<div
            className={"new-department"}
            onClick={(e) => setIsAdding(true)}>
            New Department
        </div>)}
    </div>
}

export default DepartmentsList;