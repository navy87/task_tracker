import React from "react";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";
import RadioButton from "../../../../helpers/RadioButton";

const SortOrder = ({ selected, setTrackSortOrder }) => {
    return (
        <div>
            <RadioButton
                name="track_sort_order"
                id="id_track_sort_order_asc"
                value="asc"
                checked={selected.toLowerCase() === "asc"}
                render={
                    <>
                        <HiSortAscending className="btn_icon" />
                        Oldest First
                    </>
                }
                setChecked={setTrackSortOrder}
            />

            <RadioButton
                name="track_sort_order"
                id="id_track_sort_order_desc"
                value="desc"
                checked={selected.toLowerCase() === "desc"}
                render={
                    <>
                        <HiSortDescending className="btn_icon" />
                        Latest First
                    </>
                }
                setChecked={setTrackSortOrder}
            />
        </div>
    );
};

export default SortOrder;
