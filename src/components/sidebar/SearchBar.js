import { AiOutlineFilter } from "react-icons/ai";
import SearchBox from "./SearchBox";
const SearchBar = () => {
    return (
        <div id="searchbar">
            <SearchBox />
            <AiOutlineFilter className="filter_btn" />
        </div>
    );
};

export default SearchBar;
