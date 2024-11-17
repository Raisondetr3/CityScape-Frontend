import React from 'react';
import plusIcon from '../../../assets/plus-icon.svg';
import './AddButton.css';

const AddCityButton = ({ onClick }) => {
    return (
        <button className="add-button" onClick={onClick}>
            <img src={plusIcon} alt="Plus Icon" className="plus-icon" />
            Add City
        </button>
    );
};

export default AddCityButton;
