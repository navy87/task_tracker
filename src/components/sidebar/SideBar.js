import "../../styles/sidebar/sidebar.css";
import Filter from "./filter/Filter";
import SearchBar from "./search/SearchBar";
import AddButton from "./add/AddButton";
import SortSetting from "./sort/SortSetting";
import TaskListContainer from "./tasklist/TaskListContainer";

const SideBar = () => {
    return (
        <div id="sidebar">
            <SearchBar />
            <Filter />
            <SortSetting />
            <TaskListContainer />
            <AddButton />
        </div>
    );
};

export default SideBar;
