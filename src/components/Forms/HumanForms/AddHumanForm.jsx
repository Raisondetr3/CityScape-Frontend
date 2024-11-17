import React, { useState } from 'react';
import '../Form.css';

const AddHumanForm = ({ onClose, onSubmit }) => {
    const [human, setHuman] = useState({
        name: '',
        age: '',
        height: '',
        birthday: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setHuman((prev) => ({
            ...prev,
            [field]: value,
        }));
        validateField(field, value);
    };

    const validateField = (field, value) => {
        let errorMsg = '';
        switch (field) {
            case 'name':
                if (!value.trim()) {
                    errorMsg = 'Имя не может быть пустым';
                }
                break;
            case 'age':
                if (!value || isNaN(value) || Number(value) <= 0) {
                    errorMsg = 'Возраст должен быть числом больше 0';
                }
                break;
            case 'height':
                if (!value || isNaN(value) || Number(value) <= 0) {
                    errorMsg = 'Рост должен быть числом больше 0';
                }
                break;
            case 'birthday':
                if (!value) {
                    errorMsg = 'Дата рождения обязательна';
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
        const newErrors = {};
        let valid = true;

        ['name', 'age', 'height', 'birthday'].forEach((field) => {
            const value = human[field];
            validateField(field, value);
            if (!value || errors[field]) {
                newErrors[field] = errors[field] || 'Это поле обязательно';
                valid = false;
            }
        });

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateAllFields()) {
            return;
        }

        const humanData = {
            ...human,
            birthday: new Date(human.birthday).toISOString(),
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_HUMAN}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(humanData),
            });

            if (!response.ok) {
                throw new Error('Ошибка при добавлении Human');
            }

            const newHuman = await response.json();
            alert('Human успешно добавлен!');
            onSubmit(newHuman);
        } catch (error) {
            console.error(error);
            alert('Не удалось добавить Human.');
        }
    };

    return (
        <div className="form-overlay">
            <div className="form-container">
                <h2>Добавить нового Human</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={human.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            required
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </label>
                    <label>
                        Age:
                        <input
                            type="number"
                            value={human.age}
                            onChange={(e) => handleChange('age', e.target.value)}
                            required
                        />
                        {errors.age && <span className="error">{errors.age}</span>}
                    </label>
                    <label>
                        Height:
                        <input
                            type="number"
                            value={human.height}
                            onChange={(e) => handleChange('height', e.target.value)}
                            required
                        />
                        {errors.height && <span className="error">{errors.height}</span>}
                    </label>
                    <label>
                        Birthday:
                        <input
                            type="datetime-local"
                            value={human.birthday}
                            onChange={(e) => handleChange('birthday', e.target.value)}
                            required
                        />
                        {errors.birthday && <span className="error">{errors.birthday}</span>}
                    </label>
                    <div className="form-buttons">
                        <button type="submit">Добавить</button>
                        <button type="button" onClick={onClose}>
                            Отмена
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddHumanForm;
