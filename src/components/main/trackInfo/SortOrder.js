import React from "react";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";
import RadioButton from "../../helpers/RadioButton";

const SortOrder = ({ selected, setSortOrder }) => {
    // const [checked, setChecked] = useState(selected);
    return (
        <div>
            <RadioButton
                name="sort_order"
                id="id_sort_order_asc"
                value="asc"
                checked={selected.toLowerCase() === "asc"}
                render={
                    <>
                        <HiSortAscending className="btn_icon" />
                        Oldest First
                    </>
                }
                setChecked={setSortOrder}
            />

            <RadioButton
                name="sort_order"
                id="id_sort_order_desc"
                value="desc"
                checked={selected.toLowerCase() === "desc"}
                render={
                    <>
                        <HiSortDescending className="btn_icon" />
                        Latest First
                    </>
                }
                setChecked={setSortOrder}
            />
        </div>
    );
};

export default SortOrder;
