import React from 'react';
import historyIcon from '../../../assets/history-icon.svg';
import './AddButton.css';

const ImportHistoryButton = ({ onClick }) => {
    return (
        <button className="add-button" onClick={onClick}>
            <img src={historyIcon} alt="History Icon" className="plus-icon" />
            Import History
        </button>
    );
};

export default ImportHistoryButton;
