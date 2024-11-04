import React from 'react';
import './AdminButtons.css';

const RejectButton = ({ onClick }) => (
    <button className="reject-button" onClick={onClick}>
        Отклонить
    </button>
);

export default RejectButton;
