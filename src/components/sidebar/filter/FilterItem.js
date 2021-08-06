import React from "react";
import styled from "styled-components";

const ItemStyled = styled.div`
    margin: 0.75rem auto;
    display: flex;
    font-size: 0.8rem;
    font-weight: 500;

    .label {
        font-weight: 300;
        width: 5.75rem;
        margin-right: 0.5rem;
    }
`;

const FilterItem = ({ label, render }) => {
    return (
        <ItemStyled>
            <div className="label">{label}</div>
            {render}
        </ItemStyled>
    );
};

export default FilterItem;
