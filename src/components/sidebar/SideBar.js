import "../../styles/sidebar/sidebar.css";
import Filter from "./filter/Filter";
import SearchBar from "./search/SearchBar";
import TaskList from "./tasklist/TaskList";
import AddButton from "./add/AddButton";
import SortSetting from "./sort/SortSetting";

const SideBar = () => {
    return (
        <div id="sidebar">
            <SearchBar />
            <Filter />
            <SortSetting />
            <TaskList />
            <AddButton />
        </div>
    );
};

export default SideBar;
