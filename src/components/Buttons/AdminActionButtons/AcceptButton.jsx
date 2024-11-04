import React from 'react';
import './AdminButtons.css';

const AcceptButton = ({ onClick }) => (
    <button className="accept-button" onClick={onClick}>
        Одобрить
    </button>
);

export default AcceptButton;
