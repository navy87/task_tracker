import React from "react";
import { MdAdd } from "react-icons/md";
import styled from "styled-components";

const AddButtonStyled = styled.div`
    position: absolute;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 5%;
    bottom: 5%;
    z-index: 100;

    width: 3rem;
    height: 3rem;
    border-radius: 3rem;
    background-color: blue;

    .icon {
        width: 2rem;
        height: 2rem;
    }

    &:hover {
        box-shadow: 5px 5px 5px #ccc;
    }

    &:active {
        transform: scale(0.98);
    }
`;

const AddButton = () => {
    return (
        <AddButtonStyled>
            <MdAdd className="icon" color={"white"} />
        </AddButtonStyled>
    );
};

export default AddButton;
