import React, { useState } from 'react';
import '../Form.css';

const EditCoordinatesForm = ({ coordinatesData, onClose, onSubmit }) => {
    const [coordinates, setCoordinates] = useState({ ...coordinatesData });
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
            const response = await fetch(`${process.env.REACT_APP_COORDINATES}/${coordinates.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(coordinates),
            });

            if (!response.ok) {
                throw new Error('Ошибка при обновлении Coordinates');
            }

            const updatedCoordinates = await response.json();
            alert('Coordinatesы успешно обновлены!');
            onSubmit(updatedCoordinates);
        } catch (error) {
            console.error('Ошибка при обновлении Coordinates:', error);
            alert('Не удалось обновить Coordinatesы.');
        }
    };

    return (
        <div className="form-overlay">
            <div className="form-container">
                <h2>Редактировать Coordinatesы</h2>
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
                    <button type="submit">Сохранить изменения</button>
                    <button type="button" onClick={onClose}>
                        Отмена
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditCoordinatesForm;
