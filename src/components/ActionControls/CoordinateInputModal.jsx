import React, { useState } from 'react';
import arrowDown from '../../assets/arrow-down.svg';
import './CoordinateInputModal.css';

function CoordinateInputModal({ onClose, onSubmit }) {
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
        <div className="coordinate-modal">
            <div className="coordinate-modal-header">
                <span>Введите координаты</span>
                <img
                    src={arrowDown}
                    alt="Close"
                    onClick={onClose}
                />
            </div>
            <div className="coordinate-modal-content">
                <input type="number" placeholder="x" name="x" className="coordinate-input" value={coordinates.x} onChange={handleInputChange} />
                <input type="number" placeholder="y" name="y" className="coordinate-input" value={coordinates.y} onChange={handleInputChange} />
                <input type="number" placeholder="z" name="z" className="coordinate-input" value={coordinates.z} onChange={handleInputChange} />
            </div>
            <button className="submit-button" onClick={handleSubmit}>Готово</button>
        </div>
    );
}

export default CoordinateInputModal;
