import React from "react";

const InfoContainer = ({ label, info_render, htmlFor }) => {
    return (
        <div className="info_container">
            <label className="info-label" htmlFor={htmlFor}>
                {label}
            </label>
            {info_render}
            {/* <div className="info">1250</div> */}
        </div>
    );
};

export default InfoContainer;
