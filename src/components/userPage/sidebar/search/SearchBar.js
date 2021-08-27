import SearchBox from "./SearchBox";
import SearchResult from "./SearchResult";
import { useContext } from "react";
import { FilterContext } from "../../../../contexts/SidebarContext";
import { MdFilterList, MdSort } from "react-icons/md";

const SearchBar = () => {
    const { filterVisible, setFilterVisible, sorterVisible, setSorterVisible } =
        useContext(FilterContext);

    return (
        <>
            <div id="searchbar">
                <SearchBox />
                <label
                    htmlFor="filter_toggle"
                    className={`${filterVisible ? "selected" : ""}`}
                >
                    <MdFilterList
                        className="filter_btn"
                        data-tip="Filter Tasks"
                    />
                    <input
                        id="filter_toggle"
                        type="checkbox"
                        checked={filterVisible}
                        onChange={() =>
                            setFilterVisible((currentVisibility) => {
                                if (!currentVisibility) {
                                    setSorterVisible(false);
                                }
                                return !currentVisibility;
                            })
                        }
                        style={{ display: "none" }}
                    />
                </label>
                <label
                    htmlFor="sort_toggle"
                    className={`${sorterVisible ? "selected" : ""}`}
                >
                    <MdSort className="filter_btn" data-tip="Sort Tasks" />
                    <input
                        id="sort_toggle"
                        type="checkbox"
                        checked={sorterVisible}
                        onChange={() =>
                            setSorterVisible((currentVisibility) => {
                                if (!currentVisibility) {
                                    setFilterVisible(false);
                                }
                                return !currentVisibility;
                            })
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
