import {useContext} from "react";
import {BsSearch} from "react-icons/bs";
import {FilterContext} from "../../../../contexts/SidebarContext";

const SearchBox = () => {
    const {filteredKeywords, setFilteredKeywords} = useContext(FilterContext);

    const handleChange = (e) => {
        const value = e.target.value;
        setFilteredKeywords(value);
    };

    return (
        <div className="searchbox">
            <input
                type="text"
                placeholder="Search"
                value={filteredKeywords}
                onChange={handleChange}
            />
            <BsSearch className="search_btn"/>
        </div>
    );
};

export default SearchBox;
