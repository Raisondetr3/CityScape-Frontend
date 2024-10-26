import React from 'react';
import './HelloPage.css';

const HelloPage = () => {
    return (
        <div className="hello-page-container">
            <main>
                <h1>Добро пожаловать в CityScape!</h1>
                <p>Здесь вы можете управлять объектами и видеть их данные в реальном времени.</p>
                <p>Для продолжения работы, пожалуйста, войдите или зарегистрируйтесь.</p>
            </main>
        </div>
    );
};

export default HelloPage;
