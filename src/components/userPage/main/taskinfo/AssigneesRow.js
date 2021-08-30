import SelectAssignees from "./SelectAssignees";
import AssigneeButton from "./AssigneeButton";
import React from "react";
import {v4 as UUIDv4} from "uuid";

const AssigneesRow = ({selectedTask, setSelectedTask, isOwner}) => {
    return (
        <div className="assignees_container">
            <SelectAssignees
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
            />

            {selectedTask.assignees.map((assignee, index) =>
                {
                    assignee = {...assignee, uuid: UUIDv4()}
                    return <AssigneeButton
                        key={index}
                        taskPerson={assignee}
                        selectedTask={selectedTask}
                        setSelectedTask={setSelectedTask}
                        isOwner={isOwner}
                    />
                }
            )}
        </div>
    )
}

export default AssigneesRow;