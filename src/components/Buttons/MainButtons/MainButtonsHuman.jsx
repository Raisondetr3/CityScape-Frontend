import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainButtons.css';

function MainButtonsCity({ role }) {
    const navigate = useNavigate();

    const handleNavigation = (page) => {
        if (role === 'ADMIN') {
            navigate(`/admin/${page.toLowerCase()}`);
        } else {
            navigate(`/user/${page.toLowerCase()}`);
        }
    };

    return (
        <div className="main-buttons-container">
            <button className="main-button active" onClick={() => handleNavigation('Human')}>Human</button>
            <button className="main-button inactive" onClick={() => handleNavigation('City')}>City</button>
            <button className="main-button inactive" onClick={() => handleNavigation('Coordinates')}>Coordinates</button>
        </div>
    );
}

export default MainButtonsCity;