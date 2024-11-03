import React, { useState, useContext } from 'react';
import './Auth.css';
import { UserContext } from '../../UserContext';

const Login = () => {
    const { login } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Ошибка авторизации.');
                return;
            }

            const data = await response.json();
            login(data.token);
            setSuccessMessage('Вход успешен! Вы будете перенаправлены.');

        } catch (error) {
            setErrorMessage('Произошла ошибка при авторизации.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Вход</h2>
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
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default Login;
