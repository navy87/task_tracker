import React from "react";

const FilterItem = ({ label, render }) => {
    return (
        <div className="filter_item">
            <div className="label">{label}</div>
            {render}
        </div>
    );
};

export default FilterItem;
