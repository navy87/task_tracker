import React from "react";
import { MdPersonAdd } from "react-icons/md";
import CheckBox from "../../helpers/CheckBox";
import FilterItem from "./FilterItem";

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

            <FilterItem
                label="Priorities"
                render={
                    <div>
                        <CheckBox
                            text="Low"
                            id="low_priority"
                            name="priority"
                            value="low"
                        />
                        <CheckBox
                            text="Medium"
                            id="mid_priority"
                            name="priority"
                            value="mid"
                        />
                        <CheckBox
                            text="High"
                            id="high_priority"
                            name="priority"
                            value="high"
                        />
                    </div>
                }
            />

            <FilterItem
                label="Status"
                render={
                    <div>
                        <CheckBox
                            text="Active"
                            id="activity_status"
                            name="status"
                            value="active"
                        />
                        <CheckBox
                            text="Finished"
                            id="finished_status"
                            name="status"
                            value="finished"
                        />
                        <CheckBox
                            text="Cancelled"
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
