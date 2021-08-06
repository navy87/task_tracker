import React, { useContext } from "react";
import { FilterContext } from "../../../contexts/SidebarContext";
import FilterGrid from "./FilterGrid";
// MdPersonAdd

const Filter = () => {
    const { filterVisible } = useContext(FilterContext);

    // const FilterStyled = styled.div`
    //     transform: scaleY(${filterVisible ? 1 : 0});
    // `;
    return (
        <div className={`filter ${!filterVisible && "hide"}`}>
            <h2>Filter</h2>
            <FilterGrid />
        </div>
    );
};

export default Filter;
