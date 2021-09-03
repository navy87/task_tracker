import React from "react";
import {Link} from "react-router-dom";

const DashboardButton = ({match, to, icon, text, color = "navy"}) => {
    return (
        <Link className="button-link" to={to}>
            <div className={`dashboard-button`} style={{backgroundColor: color}}>
                {icon}
                {text}
            </div>
        </Link>
    );
};

export default DashboardButton;
