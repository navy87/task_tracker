import React from "react";
import {Link, Redirect, Route} from "react-router-dom";

const ProtectedRoute = ({component: Component, requiredRole, ...rest}) => {

    return (
        <Route
            {...rest}
            render={(props) => {
                if (localStorage.getItem("token")) {
                    const currentRole = JSON.parse(localStorage.getItem("user")).role.name.toUpperCase();
                    if (!requiredRole || requiredRole.toUpperCase() === "USER") {
                        if (currentRole !== "SUPER_ADMIN") {
                            return <Component {...props} />;
                        } else {
                            return <Redirect to={{pathname: "/admin"}}/>
                        }
                    } else if (requiredRole.toUpperCase() === "ADMIN" && (currentRole === "ADMIN" || currentRole === "SUPER_ADMIN")) {
                        return <Component {...props} />
                    } else if (requiredRole.toUpperCase() === "SUPER_ADMIN" && currentRole === "SUPER_ADMIN") {
                        return <Component {...props} />
                    } else {
                        return <div className={"error-full-page"}>
                            <h1>You are not authorized.</h1>
                            <p className={"subtitle"}>You are unauthorized to access this page. This page is reserved
                                for system administration people.</p>
                            <p className={"disclaimer"}>If you think you are seeing this wrongly, please contact your
                                system administration or IT department.</p>
                            <Link className={"go-back-btn"} to={"/"}>
                                Go Home
                            </Link>
                        </div>
                    }
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {from: props.location},
                            }}
                        />
                    );
                }
            }}
        />)
};

export default ProtectedRoute;
