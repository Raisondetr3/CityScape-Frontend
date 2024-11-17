import React, { useState, useEffect } from 'react';
import '../Form.css';

const EditHumanForm = ({ humanData, onClose, onSubmit }) => {
    const [human, setHuman] = useState({ ...humanData });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setHuman(prev => ({
            ...prev,
            birthday: formatDateTimeForInput(prev.birthday),
        }));
    }, []);

    const formatDateTimeForInput = (dateTimeStr) => {
        if (!dateTimeStr) return '';
        const date = new Date(dateTimeStr);
        const isoString = date.toISOString();
        return isoString.slice(0, 16);
    };

    const formatDateTime = (dateTimeStr) => {
        if (!dateTimeStr) return null;
        const date = new Date(dateTimeStr);

        if (isNaN(date.getTime())) {
            console.error('Недопустимая дата:', dateTimeStr);
            return null;
        }

        const year = date.getUTCFullYear();
        const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
        const day = ('0' + date.getUTCDate()).slice(-2);
        const hours = ('0' + date.getUTCHours()).slice(-2);
        const minutes = ('0' + date.getUTCMinutes()).slice(-2);
        const seconds = ('0' + date.getUTCSeconds()).slice(-2);

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    };

    const handleChange = (field, value) => {
        setHuman(prev => ({
            ...prev,
            [field]: value,
        }));
        validateField(field, value);
    };

    const validateField = (field, value) => {
        let errorMsg = '';
        switch (field) {
            case 'name':
                if (!value || value.trim() === '') {
                    errorMsg = 'Имя не может быть пустым';
                }
                break;
            case 'age':
                if (value === '' || isNaN(value) || Number(value) <= 0) {
                    errorMsg = 'Возраст должен быть больше 0';
                }
                break;
            case 'height':
                if (value === '' || isNaN(value) || Number(value) <= 0) {
                    errorMsg = 'Рост должен быть больше 0';
                }
                break;
            default:
                break;
        }
        setErrors(prevErrors => ({
            ...prevErrors,
            [field]: errorMsg,
        }));
    };

    const validateAllFields = () => {
        let valid = true;
        let newErrors = {};

        if (!human.name || human.name.trim() === '') {
            newErrors.name = 'Имя не может быть пустым';
            valid = false;
        }

        if (human.age === '' || isNaN(human.age) || Number(human.age) <= 0) {
            newErrors.age = 'Возраст должен быть больше 0';
            valid = false;
        }

        if (human.height === '' || isNaN(human.height) || Number(human.height) <= 0) {
            newErrors.height = 'Рост должен быть больше 0';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateAllFields();
        if (!isValid) {
            alert('Не удалось обновить данные Human.');
            return;
        }

        const humanDataToUpdate = {
            id: human.id,
            name: human.name,
            age: human.age,
            height: human.height,
            birthday: formatDateTime(human.birthday),
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_HUMAN}/${human.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(humanDataToUpdate),
            });

            if (!response.ok) {
                throw new Error('Ошибка при обновлении Human.');
            }

            const updatedHuman = await response.json();
            alert('Human успешно обновлен!');
            onSubmit(updatedHuman);
        } catch (error) {
            console.error(error);
            alert('Не удалось обновить Human.');
        }
    };

    return (
        <div className="form-overlay">
            <div className="form-container">
                <h2>Редактировать Human</h2>
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
                        />
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

export default EditHumanForm;
