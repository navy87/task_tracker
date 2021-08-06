import React from "react";
import { MdPersonAdd } from "react-icons/md";

import CheckBox from "../../helpers/CheckBox";
import FilterItem from "./FilterItem";
import PriorityFilter from "./PriorityFilter";

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

            <FilterItem
                label="Status"
                render={
                    <div>
                        <CheckBox
                            render="Active"
                            id="activity_status"
                            name="status"
                            value="active"
                        />
                        <CheckBox
                            render="Finished"
                            id="finished_status"
                            name="status"
                            value="finished"
                        />
                        <CheckBox
                            render="Cancelled"
                            id="cancelled_status"
                            name="status"
                            value="cancelled"
                        />
                    </div>
                }
            />
        </div>
    );
};

export default FilterGrid;
