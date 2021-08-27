import React, { useEffect, useState } from "react";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";
import RadioButton from "../../../helpers/RadioButton";

const SortOrderSelect = ({ selected, setTaskSortOrder }) => {
    const [checked, setChecked] = useState(selected.order);

    useEffect(() => {
        setTaskSortOrder((current) => ({ ...current, order: checked }));
    }, [setTaskSortOrder, checked]);

    return (
        <div className="option_container">
            <RadioButton
                name="task_sort_order"
                id="id_task_sort_order_asc"
                value="asc"
                checked={checked.toLowerCase() === "asc"}
                render={
                    <>
                        <HiSortAscending className="btn_icon" />
                        Ascending
                    </>
                }
                setChecked={setChecked}
            />
            <RadioButton
                name="task_sort_order"
                id="id_task_sort_order_desc"
                value="desc"
                checked={checked.toLowerCase() === "desc".toLowerCase()}
                render={
                    <>
                        <HiSortDescending className="btn_icon" />
                        Descending
                    </>
                }
                setChecked={setChecked}
            />
        </div>
    );
};

export default SortOrderSelect;
