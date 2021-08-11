import React, { useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";
import SortBySelect from "./SortBySelect";
import SortOrderSelect from "./SortOrderSelect";

const SortSetting = () => {
    const { taskSortOrder, setTaskSortOrder } = useContext(GlobalContext);
    return (
        <div className="sort_setting">
            <div className="sort_type">
                Sort By:
                <SortBySelect
                    selected={taskSortOrder}
                    setTaskSortOrder={setTaskSortOrder}
                />
            </div>
            <div className="sort_type">
                Sort Order:
                <SortOrderSelect
                    selected={taskSortOrder}
                    setTaskSortOrder={setTaskSortOrder}
                />
            </div>
        </div>
    );
};

export default SortSetting;
