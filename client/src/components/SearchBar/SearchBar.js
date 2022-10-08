import React from 'react';
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

function SearchBar({placeholder, data}) {



    return (
        <div className="search">
            <div className="searchInput"> 
            <input 
                type="text" 
                placeholder={placeholder}
            /> 
            <div className="searchIcon">
                <SearchIcon />
            </div>
        </div>
        <div className="dataResult">  </div>
        </div>

    );
}

export default SearchBar

