import React, {useContext} from "react";
import {FilterContext} from "../../../../contexts/SidebarContext";
import FilterGrid from "./FilterGrid";

const Filter = () => {
    const {filterVisible} = useContext(FilterContext);

    return (
        <div className={`filter ${!filterVisible && "hide"}`}>
            <h2>Filter</h2>
            <FilterGrid/>
        </div>
    );
};

export default Filter;
