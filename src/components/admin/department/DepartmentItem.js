import React, {useContext, useState} from "react";
import InlineForm from "./InlineForm";
import {getDepartmentURL} from "../../../helpers/Helper";
import axios from "axios";
import toast from "react-hot-toast";
import {QuestionDialog} from "../../../helpers/Dialog";
import {GlobalContext} from "../../../contexts/GlobalContext";

const DepartmentItem = ({department, refreshDepartments, isNew, setIsAdding}) => {
    const {setDialog} = useContext(GlobalContext)
    const [edit, setEdit] = useState(isNew);

    // const location = useLocation()

    const onSubmit = async (e, data) => {
        e.preventDefault();

        setIsAdding(false)
        if (data.cancelled) {
            setEdit(false)
            return
        }
        try {
            const url = getDepartmentURL(department.id);
            department.name = data.value
            const res = await axios(url, {
                method: department.id ? "PUT" : "POST",
                data: JSON.stringify(department)
            })
            if (res.status === 200) {
                refreshDepartments()
                toast.success(`Department has been ${department.id ? "updated" : "added"} successfully.`, {
                    duration: 4000
                })
            }
        } catch (e) {
            console.error(e)
        }
        setEdit(false)
    }

    const deleteDepartment = async (e) => {
        try {
            const url = getDepartmentURL(department.id)
            const res = await axios.delete(url)
            if (res.status === 200) {
                refreshDepartments()
                toast.success("Department has been deleted successfully.", {
                    duration: 4000
                })
            }
        } catch (e) {
            console.error(e)
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        if (!department.id) {
            return
        }
        setDialog(
            <QuestionDialog
                text="Remove Department?"
                subtext="Are you sure? This action can not be undone."
                title="Just Checking"
                onYes={deleteDepartment}
                onNo={() => true}
                closeAfterwards={true}
            />
        );
    }

    return <div className={`department-item ${isNew ? "new" : ""}`}>
        {edit ? <InlineForm initialValue={department.name} onSubmit={onSubmit}/> : department.name}
        {!isNew && (
            <div className={"buttons"}>
            {
                !edit &&
                <div className={"link-btn edit"} onClick={event => setEdit(current => {
                    setIsAdding(false)
                    return !current
                })}>
                    Edit
                </div>
            }

                <div className={"link-btn delete"} onClick={handleDelete}>
                    Delete
                </div>
            </div>
        )
        }
    </div>
}

export default DepartmentItem;