import React from 'react';
import plusIcon from '../../../assets/plus-icon.svg';
import './AddCityButton.css';

const AddCityButton = ({ onClick }) => {
    return (
        <button className="add-city-button" onClick={onClick}>
            <img src={plusIcon} alt="Plus Icon" className="plus-icon" />
            Add City
        </button>
    );
};

export default AddCityButton;
