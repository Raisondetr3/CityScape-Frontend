import React, { useState } from 'react';
import '../Form.css';

const AddCoordinatesForm = ({ onClose, onSubmit }) => {
    const [coordinates, setCoordinates] = useState({
        x: '',
        y: '',
    });

    const [errors, setErrors] = useState({});

    const validateField = (field, value) => {
        let errorMsg = '';
        switch (field) {
            case 'x':
                if (value === '' || isNaN(value) || Number(value) > 820 || Number(value) < 0) {
                    errorMsg = 'X должно быть числом от 0 до 820';
                }
                break;
            case 'y':
                if (value === '' || isNaN(value)) {
                    errorMsg = 'Y должно быть числом';
                }
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: errorMsg,
        }));
    };

    const validateAllFields = () => {
        const { x, y } = coordinates;
        let valid = true;
        const newErrors = {};

        if (x === '' || isNaN(x) || Number(x) > 820 || Number(x) < 0) {
            newErrors.x = 'X должно быть числом от 0 до 820';
            valid = false;
        }
        if (y === '' || isNaN(y)) {
            newErrors.y = 'Y должно быть числом';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleChange = (field, value) => {
        setCoordinates((prev) => ({
            ...prev,
            [field]: value,
        }));
        validateField(field, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateAllFields()) {
            alert('Пожалуйста, исправьте ошибки в форме.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_COORDINATES}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(coordinates),
            });

            if (!response.ok) {
                throw new Error('Ошибка при добавлении Coordinates');
            }

            const addedCoordinates = await response.json();
            alert('Coordinates успешно добавлены!');
            onSubmit(addedCoordinates);
        } catch (error) {
            console.error('Ошибка при добавлении Coordinates:', error);
            alert('Не удалось добавить Coordinates.');
        }
    };

    return (
        <div className="form-overlay">
            <div className="form-container">
                <h2>Добавить новые Coordinates</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        X:
                        <input
                            type="number"
                            value={coordinates.x}
                            onChange={(e) => handleChange('x', e.target.value)}
                            required
                        />
                        {errors.x && <span className="error">{errors.x}</span>}
                    </label>
                    <label>
                        Y:
                        <input
                            type="number"
                            value={coordinates.y}
                            onChange={(e) => handleChange('y', e.target.value)}
                            required
                        />
                        {errors.y && <span className="error">{errors.y}</span>}
                    </label>
                    <button type="submit">Добавить Coordinates</button>
                    <button type="button" onClick={onClose}>
                        Отмена
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCoordinatesForm;
