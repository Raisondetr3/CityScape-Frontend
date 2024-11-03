import React, { useState } from 'react';
import '../../styles/Auth.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isAdminRequest, setIsAdminRequest] = useState(false);

    const validatePassword = (password) => {
        const minLength = 6;
        if (password.length < minLength) {
            return `Пароль должен содержать не менее ${minLength} символов.`;
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const passwordError = validatePassword(password);
        if (passwordError) {
            setErrorMessage(passwordError);
            return;
        }

        setErrorMessage('');

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Ошибка регистрации.');
                return;
            }

            // Проверка наличия администратора в системе
            const adminCheck = await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin-exists`, {
                method: 'GET',
            });
            const adminExists = await adminCheck.json();

            if (adminExists) {
                setIsAdminRequest(true);
                setSuccessMessage('Заявка на права администратора отправлена. Ожидайте подтверждения.');
            } else {
                setSuccessMessage('Регистрация успешна!');
            }
            setUsername(''); // Сброс полей
            setPassword('');

        } catch (error) {
            setErrorMessage('Произошла ошибка при регистрации.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Имя пользователя (username):</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                {isAdminRequest && <p>Администратор рассмотрит вашу заявку.</p>}
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default Register;
