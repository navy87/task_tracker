import React from "react";
import {
    FcLowPriority,
    FcMediumPriority,
    FcHighPriority,
} from "react-icons/fc";

import { BsCalendar } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import styled from "styled-components";

const priorityMap = {
    low: {
        text: "Low Priority",
        icon: <FcLowPriority className="icon" />,
    },
    mid: {
        text: "Medium Priority",
        icon: <FcMediumPriority className="icon" />,
    },
    high: {
        text: "High Priority",
        icon: <FcHighPriority className="icon" />,
    },
};

const TaskItemStyled = styled.div`
    cursor: pointer;
    margin: 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #aaa;
`;

const TitleStyled = styled.div`
    font-family: "Montserrat", sans-serif;
    display: flex;
    align-items: center;
    gap: 0.25rem;

    h3 {
        font-size: 1rem;
        font-weight: 500;
    }

    .status {
    }
`;

const DescriptionStyled = styled.p`
    font-family: "Montserrat", sans-serif;
    font-size: 0.75rem;
    font-weight: 400;
    padding: 5px 0;
    text-align: justify;
`;

const DetailsStyled = styled.div`
    margin: 0.25rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;

    .icon {
        width: 1.2rem;
        height: 1.2rem;
    }

    div {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }

    .priority {
        font-weight: bold;
    }

    .assignees {
        font-weight: 300;
    }
`;

const TaskItem = ({
    name,
    description,
    priority,
    dueDate,
    persons,
    status,
}) => {
    const StatusStyled = styled.span`
        border: 1px solid;
        padding: 2px 5px;
        border-radius: 1rem;
        border-color: ${status == "Done"
            ? "green"
            : status == "Cancelled"
            ? "gray"
            : "blue"};
        color: ${status == "Done"
            ? "green"
            : status == "Cancelled"
            ? "gray"
            : "blue"};
        /* color: ${status == "Active" ? "green" : "red"}; */
        font-size: 0.5rem;
        font-weight: normal;
    `;
    return (
        <TaskItemStyled onClick={() => alert("Hello")}>
            <TitleStyled>
                <h3>{name}</h3>
                <StatusStyled className="status">{status}</StatusStyled>
            </TitleStyled>
            <DescriptionStyled>{description}</DescriptionStyled>
            <DetailsStyled>
                <div className="priority">
                    {priorityMap[priority].icon} {priorityMap[priority].text}
                </div>
                <div className="date">
                    <BsCalendar className="icon" /> {dueDate}
                </div>

                <div className="assignees">
                    <IoIosPeople className="icon" />
                    <b>{persons[0].name}</b>
                </div>
            </DetailsStyled>
        </TaskItemStyled>
    );
};

export default TaskItem;
