import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import toast from "react-hot-toast";
import {getCurrentUserURL} from "./helpers/Helper";

axios.interceptors.request.use(req => {
    req.headers = {
        ...req.headers,
        "Content-Type": "application/json",
        accept: "*/*",
        Authorization: localStorage.getItem("token"),
    }
    return req
})

axios.interceptors.response.use(res => {
    return res
}, error => {
    console.error(error)
    if (error.response.status === 401) { // UnauthorizedAccess
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.error("There is a problem with authentication. Please logout and login again.", {duration: 6000});
        document.location = "/"
    } else if (error.response.status === 403) { // Forbidden
        return error.response
    }
    throw error;
})

const refreshUser = async () => {
    if (localStorage.getItem("token")) {
        try {
            const response = await axios.get(getCurrentUserURL());
            const user = response.data;
            localStorage.setItem("user", user)
        }catch (e) {
            console.error(e)
        }
    }
}

refreshUser().then(null);

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals();
