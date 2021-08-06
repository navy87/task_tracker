import "../../styles/sidebar/sidebar.css";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";

const SideBar = () => {
    return (
        <div id="sidebar">
            <SearchBar />
            <SearchResult />
        </div>
    );
};

export default SideBar;
