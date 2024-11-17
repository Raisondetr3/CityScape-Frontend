import React from 'react';
import plusIcon from '../../../assets/plus-icon.svg';
import './AddButton.css';

const AddHumanButton = ({ onClick }) => {
    return (
        <button className="add-button" onClick={onClick}>
            <img src={plusIcon} alt="Plus Icon" className="plus-icon" />
            Add Human
        </button>
    );
};

export default AddHumanButton;
