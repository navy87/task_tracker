import React, {useEffect, useState} from "react";
import RadioButton from "../../../../helpers/RadioButton";

const SortBySelect = ({selected, setTaskSortOrder}) => {
    const [checked, setChecked] = useState(selected.by);

    useEffect(() => {
        setTaskSortOrder((current) => ({...current, by: checked}));
    }, [setTaskSortOrder, checked]);

    return (
        <div className="option_container">
            <RadioButton
                name="task_sort_by"
                id="id_task_sort_by_title"
                value="title"
                checked={checked.toLowerCase() === "title"}
                render={<>Title</>}
                setChecked={setChecked}
            />
            <RadioButton
                name="task_sort_by"
                id="id_task_sort_by_dueDate"
                value="dueDate"
                checked={checked.toLowerCase() === "dueDate".toLowerCase()}
                render={<>Deadline</>}
                setChecked={setChecked}
            />
            {/* <RadioButton
                name="task_sort_by"
                id="id_task_sort_by_addedDate"
                value="addedDate"
                checked={checked.toLowerCase() === "addedDate".toLowerCase()}
                render={<>Added Date</>}
                setChecked={setChecked}
            /> */}
            <RadioButton
                name="task_sort_by"
                id="id_task_sort_by_priority"
                value="priority"
                checked={checked.toLowerCase() === "priority"}
                render={<>Priority</>}
                setChecked={setChecked}
            />
        </div>
    );
};

export default SortBySelect;
