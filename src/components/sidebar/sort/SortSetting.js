import React, { useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { FilterContext } from "../../../contexts/SidebarContext";
import SortBySelect from "./SortBySelect";
import SortOrderSelect from "./SortOrderSelect";

const SortSetting = () => {
    const { taskSortOrder, setTaskSortOrder } = useContext(GlobalContext);
    const { sorterVisible } = useContext(FilterContext);
    return sorterVisible ? (
        <div className="sort_setting">
            <h2>Sort Setting</h2>
            <div className="sort_type">
                <span className="label">Sort By:</span>
                <SortBySelect
                    selected={taskSortOrder}
                    setTaskSortOrder={setTaskSortOrder}
                />
            </div>
            <div className="sort_type">
                <span className="label">Sort Order:</span>
                <SortOrderSelect
                    selected={taskSortOrder}
                    setTaskSortOrder={setTaskSortOrder}
                />
            </div>
        </div>
    ) : (
        <></>
    );
};

export default SortSetting;
