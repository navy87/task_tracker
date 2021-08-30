import React from "react";
import {Link} from "react-router-dom";

const DashboardButton = ({match, to, icon, text, type}) => {
    return (
        <Link className="button-link" to={to}>
            <div className={`dashboard-button ${type}`}>
                {icon}
                {text}
            </div>
        </Link>
    );
};

export default DashboardButton;
