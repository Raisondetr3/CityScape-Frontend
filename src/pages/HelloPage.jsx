import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HelloPage.css';

const HelloPage = () => {
    return (
        <div className="hello-page-container">
            <main>
                <h1>Добро пожаловать в CityScape!</h1>
                <p>Здесь вы можете управлять объектами и видеть их данные в реальном времени.</p>
                <p>Для продолжения работы, пожалуйста, войдите или зарегистрируйтесь.</p>
                <div className="cta-buttons">
                    <Link to="/login" className="cta-button">Login</Link>
                    <Link to="/register" className="cta-button">Register</Link>
                </div>
            </main>
        </div>
    );
};

export default HelloPage;
