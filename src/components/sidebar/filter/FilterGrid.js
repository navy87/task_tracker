import React from "react";

import FilterItem from "./FilterItem";
import PriorityFilter from "./PriorityFilter";
import FilteredAssignees from "./FilteredAssignees";
import StatusFilter from "./StatusFilter";

const FilterGrid = () => {
    return (
        <div className="filters_grid">
            <FilterItem label="Assigned To" render={<FilteredAssignees />} />

            <FilterItem label="Priorities" render={<PriorityFilter />} />

            <FilterItem label="Status" render={<StatusFilter />} />
        </div>
    );
};

export default FilterGrid;
