import React from 'react';
import uploadIcon from '../../../assets/upload-icon.svg';
import './AddButton.css';

const ImportCityButton = ({ onClick }) => {
    return (
        <button className="add-button" onClick={onClick}>
            <img src={uploadIcon} alt="Upload Icon" className="plus-icon" />
            Import Cities
        </button>
    );
};

export default ImportCityButton;
