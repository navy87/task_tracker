import Main from "./components/main/Main";
import SideBar from "./components/sidebar/SideBar";
import "./styles/App.css";

function App() {
    return (
        <div className="App">
            <SideBar />
            <div id="page">
                <div className="content">
                    <Main />
                </div>
            </div>
        </div>
    );
}

export default App;
