import { BsSearch } from "react-icons/bs";
import { AiOutlineFilter } from "react-icons/ai";
const SearchBar = () => {
    return (
        <div id="searchbar">
            <div className="searchbox">
                <input type="text" placeholder="Search" />
                <BsSearch className="search_btn" />
            </div>
            <AiOutlineFilter className="filter_btn" />
        </div>
    );
};

export default SearchBar;
