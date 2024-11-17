import React, { useState } from 'react';
import arrowDown from '../../assets/arrow-down.svg';
import './CoordinatesInputModal.css';

function CoordinatesInputModal({ onClose, onSubmit }) {
    const [coordinates, setCoordinates] = useState({ x: '', y: '', z: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCoordinates((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSubmit(coordinates);
        onClose();
    };

    return (
        <div className="coordinates-modal">
            <div className="coordinates-modal-header">
                <span>Введите Coordinatesы</span>
                <img
                    src={arrowDown}
                    alt="Close"
                    onClick={onClose}
                />
            </div>
            <div className="coordinates-modal-content">
                <input type="number" placeholder="x" name="x" className="coordinates-input" value={coordinates.x} onChange={handleInputChange} />
                <input type="number" placeholder="y" name="y" className="coordinates-input" value={coordinates.y} onChange={handleInputChange} />
                <input type="number" placeholder="z" name="z" className="coordinates-input" value={coordinates.z} onChange={handleInputChange} />
            </div>
            <button className="submit-button" onClick={handleSubmit}>Готово</button>
        </div>
    );
}

export default CoordinatesInputModal;
