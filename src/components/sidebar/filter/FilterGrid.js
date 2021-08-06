import React from "react";
import { MdPersonAdd } from "react-icons/md";

import FilterItem from "./FilterItem";
import PriorityFilter from "./PriorityFilter";
import StatusFilter from "./StatusFilter";

const FilterGrid = () => {
    return (
        <div className="filters_grid">
            <FilterItem
                label="Assigned To"
                render={
                    <div>
                        Kaleb, Munir, or Yahya <MdPersonAdd />
                    </div>
                }
            />

            <FilterItem label="Priorities" render={<PriorityFilter />} />

            <FilterItem label="Status" render={<StatusFilter />} />
        </div>
    );
};

export default FilterGrid;
