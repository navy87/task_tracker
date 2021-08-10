import { useState } from "react";
import Main from "./components/main/Main";
import SideBar from "./components/sidebar/SideBar";
import { GlobalContext } from "./contexts/GlobalContext";
import "./styles/App.css";

function App() {
    const [selectedTask, setSelectedTask] = useState();

    return (
        <GlobalContext.Provider value={{ selectedTask, setSelectedTask }}>
            <div className="App">
                <SideBar />
                <div id="page">
                    <div className="content">
                        <Main />
                    </div>
                </div>
            </div>
        </GlobalContext.Provider>
    );
}

export default App;
