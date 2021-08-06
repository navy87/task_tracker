import React from "react";
import { MdPersonAdd } from "react-icons/md";
import styled from "styled-components";

const ItemStyled = styled.div`
    margin: 1rem auto;
    display: flex;

    .label {
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
