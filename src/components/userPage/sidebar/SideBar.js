import Filter from "./filter/Filter";
import SearchBar from "./search/SearchBar";
import SortSetting from "./sort/SortSetting";
import TaskListContainer from "./tasklist/TaskListContainer";

const SideBar = () => {
    return (
        <div id="sidebar">
            <SearchBar/>
            <Filter/>
            <SortSetting/>
            <TaskListContainer/>
        </div>
    );
};

export default SideBar;
