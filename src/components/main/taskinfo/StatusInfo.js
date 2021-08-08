import React from "react";
import RadioButton from "../../helpers/RadioButton";

const StatusInfo = () => {
    return (
        <div>
            <RadioButton
                id="active_status_info"
                name="status"
                render="Active"
                value="yes"
            />
            <RadioButton
                id="mid_status_info"
                name="status"
                render="Cancelled"
                value="yes"
            />
            <RadioButton
                id="finished_status_info"
                name="status"
                render="Finished"
                value="yes"
            />
        </div>
    );
};

export default StatusInfo;
