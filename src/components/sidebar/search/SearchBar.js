import { AiOutlineFilter } from "react-icons/ai";
import SearchBox from "./SearchBox";
import SearchResult from "./SearchResult";

const SearchBar = () => {
    return (
        <>
            <div id="searchbar">
                <SearchBox />
                <AiOutlineFilter className="filter_btn" />
            </div>
            <SearchResult />
        </>
    );
};

export default SearchBar;
