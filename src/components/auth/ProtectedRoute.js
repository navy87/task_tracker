import React from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ element: Component, requiredRole, ...rest }) => {
    const location = useLocation();
    const token = localStorage.getItem("token");

    if (!token) {
        // There is no token, i.e not logged in.
        return (
            <Navigate
                to="/login"
                state={{ from: location.pathname }}
                // to={{
                //     pathname: "/login",
                //     // state: { from: props.location },
                // }}
            />
        );
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const currentRole = user.role.name.toUpperCase();
    requiredRole = requiredRole || "USER";

    if (currentRole === "SUPER_ADMIN") {
        // Super Admins can only access super admin pages, they can't access user pages.
        if (["ADMIN", "SUPER_ADMIN"].includes(requiredRole)) {
            return <Outlet {...rest} />;
        } else {
            return <Navigate to="/admin" />;
        }
    } else if (
        requiredRole === "ADMIN" &&
        ["ADMIN", "SUPER_ADMIN"].includes(currentRole)
    ) {
        // Admin pages can be accessed by ADMINs and SUPER_ADMIN
        return <Outlet {...rest} />;
    } else if (requiredRole === "USER" && currentRole !== "SUPER_ADMIN") {
        // Super Admins can only access admin pages, ironic ha... lol
        // User Pages can be accessed by USER and ADMINs.
        return <Outlet {...rest} />;
    } else {
        return (
            <div className={"error-full-page"}>
                <h1>You are not authorized.</h1>
                <p className={"subtitle"}>
                    You are unauthorized to access this page. This page is
                    reserved for system administration people.
                </p>
                <p className={"disclaimer"}>
                    If you think you are seeing this wrongly, please contact
                    your system administration or IT department.
                </p>
                <Link className={"go-back-btn"} to={"/"}>
                    Go Home
                </Link>
            </div>
        );
    }

    // return (
    //     <Route
    //         {...rest}
    //         render={(props) => {
    //             if (localStorage.getItem("token")) {
    //                 if (
    //                     !requiredRole ||
    //                     requiredRole.toUpperCase() === "USER"
    //                 ) {
    //                     if (currentRole !== "SUPER_ADMIN") {
    //                         return <Component {...props} />;
    //                     } else {
    //                         return <Navigate to={{ pathname: "/admin" }} />;
    //                     }
    //                 } else if (
    //                     requiredRole.toUpperCase() === "ADMIN" &&
    //                     (currentRole === "ADMIN" ||
    //                         currentRole === "SUPER_ADMIN")
    //                 ) {
    //                     return <Component {...props} />;
    //                 } else if (
    //                     requiredRole.toUpperCase() === "SUPER_ADMIN" &&
    //                     currentRole === "SUPER_ADMIN"
    //                 ) {
    //                     return <Component {...props} />;
    //                 } else {
    //                     return (
    //                         <div className={"error-full-page"}>
    //                             <h1>You are not authorized.</h1>
    //                             <p className={"subtitle"}>
    //                                 You are unauthorized to access this page.
    //                                 This page is reserved for system
    //                                 administration people.
    //                             </p>
    //                             <p className={"disclaimer"}>
    //                                 If you think you are seeing this wrongly,
    //                                 please contact your system administration or
    //                                 IT department.
    //                             </p>
    //                             <Link className={"go-back-btn"} to={"/"}>
    //                                 Go Home
    //                             </Link>
    //                         </div>
    //                     );
    //                 }
    //             }
    //             // else {
    //             //     return (
    //             //         <Navigate
    //             //             to={{
    //             //                 pathname: "/login",
    //             //                 state: { from: props.location },
    //             //             }}
    //             //         />
    //             //     );
    //             // }
    //         }}
    //     />
    // );
};

export default ProtectedRoute;
