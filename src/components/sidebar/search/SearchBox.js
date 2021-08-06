import { BsSearch } from "react-icons/bs";

const SearchBox = () => {
    return (
        <div className="searchbox">
            <input type="text" placeholder="Search" />
            <BsSearch className="search_btn" />
        </div>
    );
};

export default SearchBox;
