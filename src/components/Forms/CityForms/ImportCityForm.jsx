import React, { useState } from 'react';
import './../Form.css';

const ImportCityForm = ({ onClose, onImportSuccess }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Пожалуйста, выберите файл для импорта.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            setLoading(true);
            setError('');
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/import`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorResponse = await response.text();
                console.error('Ошибка сервера:', response.status, errorResponse);
                throw new Error(`Ошибка при импорте файла. Статус: ${response.status}`);
            }

            const result = await response.json();
            console.log('Ответ сервера:', result); // Логируем ответ сервера для проверки

            // Проверка наличия поля objectsAdded
            const objectsAdded = result.objectsAdded || 0;
            alert(`Импорт выполнен успешно! Добавлено объектов: ${objectsAdded}`);
            onImportSuccess(); // Обновляем список городов
        } catch (err) {
            console.error('Ошибка:', err);
            setError(`Не удалось импортировать файл. Причина: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-overlay">
            <div className="form-container">
                <h2>Импорт городов</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Выберите файл (.json):
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleFileChange}
                        />
                    </label>
                    {error && <span className="error">{error}</span>}
                    <div className="button-group">
                        <button type="submit" disabled={loading}>
                            {loading ? 'Импортируем...' : 'Импортировать'}
                        </button>
                        <button type="button" onClick={onClose}>
                            Отмена
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ImportCityForm;
