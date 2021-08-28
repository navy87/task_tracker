import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../../contexts/GlobalContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { auth } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (auth.authenticated) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location },
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default ProtectedRoute;
