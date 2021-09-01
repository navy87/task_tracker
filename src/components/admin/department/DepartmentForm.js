import {getDepartmentURL} from "../../../helpers/Helper";
import axios from "axios";
import toast from "react-hot-toast";

const DepartmentForm = ({selectedDepartment, setSelectedDepartment, refreshDepartments}) => {
    // console.log(selectedDepartment)
    const handleDepartmentSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = getDepartmentURL(selectedDepartment.id);
            const res = await axios(url, {
                method: selectedDepartment.id ? "PUT" : "POST",
                data: JSON.stringify(selectedDepartment)
            })
            if (res.status === 200) {
                refreshDepartments()
                toast.success(`Department has been ${selectedDepartment.id ? "updated" : "added"} successfully.`, {
                    duration: 4000
                })
                setSelectedDepartment({id: null, name:""})
            }
        }catch (e) {
            console.error(e)
        }

    }

    return <div className={"form-container"}>
        <h2>Department Details</h2>
        <form onSubmit={handleDepartmentSubmit}>
            <input
                type={"text"}
                placeholder={"Department Name"}
                required
                autoFocus={true}
                autoComplete={"off"}
                name={"DepartmentName"}
                value={selectedDepartment.name}
                onChange={event => setSelectedDepartment(current => ({...current, name: event.target.value}))}
            />
            <button type={"submit"}>{selectedDepartment.id ? "Update" : "Add"}</button>
        </form>
    </div>
}

export default  DepartmentForm;