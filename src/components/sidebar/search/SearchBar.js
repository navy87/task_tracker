import { AiOutlineFilter } from "react-icons/ai";
import SearchBox from "./SearchBox";
import SearchResult from "./SearchResult";
import { useContext } from "react";
import { FilterContext } from "../../../contexts/SidebarContext";

const SearchBar = () => {
    const { filterVisible, setFilterVisible } = useContext(FilterContext);

    return (
        <>
            <div id="searchbar">
                <SearchBox />
                <label
                    htmlFor="filter_toggle"
                    style={{ color: `${filterVisible ? "black" : "gray"}` }}
                >
                    <AiOutlineFilter className="filter_btn" />
                    <input
                        id="filter_toggle"
                        type="checkbox"
                        checked={filterVisible}
                        onChange={() =>
                            setFilterVisible(
                                (currentVisibility) => !currentVisibility
                            )
                        }
                        style={{ display: "none" }}
                    />
                </label>
            </div>
            <SearchResult />
        </>
    );
};

export default SearchBar;
