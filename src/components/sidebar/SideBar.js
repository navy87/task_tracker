import "../../styles/sidebar/sidebar.css";
import Filter from "./filter/Filter";
import SearchBar from "./search/SearchBar";

const SideBar = () => {
    return (
        <div id="sidebar">
            <SearchBar />
            <Filter />
        </div>
    );
};

export default SideBar;
