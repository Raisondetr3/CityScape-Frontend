import React from 'react';
import searchIcon from '../../assets/search-icon.svg';
import './SearchBar.css';

const SearchBar = ({ placeholder }) => {
    return (
        <div className="search-bar">
            <img src={searchIcon} alt="Search Icon" className="search-icon" />
            <input
                type="text"
                className="search-input"
                placeholder={placeholder}
            />
        </div>
    );
};

export default SearchBar;
