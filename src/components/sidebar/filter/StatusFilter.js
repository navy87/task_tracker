import React from "react";
import StatusCheckbox from "./StatusCheckbox";

const StatusFilter = () => {
    return (
        <div>
            <StatusCheckbox
                render="Active"
                id="activity_status"
                name="status"
                value="active"
            />
            <StatusCheckbox
                render="Done"
                id="done_status"
                name="status"
                value="done"
            />
            <StatusCheckbox
                render="Cancelled"
                id="cancelled_status"
                name="status"
                value="cancelled"
            />
        </div>
    );
};

export default StatusFilter;
