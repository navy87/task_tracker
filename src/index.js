import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import axios from "axios";
import toast from "react-hot-toast";

axios.interceptors.request.use((req) => {
    req.headers = {
        ...req.headers,
        "Content-Type": "application/json",
        accept: "*/*",
        Authorization: localStorage.getItem("token"),
    };
    return req;
});

axios.interceptors.response.use(
    (res) => {
        return res;
    },
    (error) => {
        if (process.env.NODE_ENV === "development") {
            console.error(error);
        }
        if (error.response.status === 401) {
            // UnauthorizedAccess
            if (localStorage.getItem("token")) {
                toast.error(
                    "There is a problem with authentication. Please logout and login again.",
                    { duration: 6000 }
                );
            }
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
        throw error;
    }
);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
