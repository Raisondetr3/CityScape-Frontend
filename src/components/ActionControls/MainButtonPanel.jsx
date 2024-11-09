import React, { useState } from 'react';
import ActionButton from './ActionButton';
import SelectableButton from './SelectableButton';
import CoordinateInputModal from './CoordinateInputModal';
import './MainButtonPanel.css';

function MainButtonPanel() {
    const [isCoordinateModalOpen, setCoordinateModalOpen] = useState(false);

    const toggleCoordinateModal = () => {
        setCoordinateModalOpen(prevState => !prevState);
    };

    const getAuthToken = () => localStorage.getItem('token');

    const fetchWithAuth = async (url, options = {}) => {
        const token = getAuthToken();
        const response = await fetch(url, {
            ...options,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        const isEmpty = response.status === 204 || response.headers.get('Content-Length') === '0';
        if (!response.ok) {
            const errorText = isEmpty ? 'Сервер вернул ошибку без сообщения.' : await response.text();
            throw new Error(errorText || 'Ошибка при выполнении запроса');
        }

        return isEmpty ? null : response.json();
    };

    const handleDeleteGovernment = async (government) => {
        try {
            await fetchWithAuth(`${process.env.REACT_APP_CITY}/government?government=${government}`, {
                method: 'DELETE',
            });
            alert(`Объект с government "${government}" успешно удален.`);
        } catch (error) {
            console.error(error);
            alert(`Ошибка при удалении объекта с government "${government}": ${error.message}`);
        }
    };

    const handleCountByClimate = async (climate) => {
        try {
            const count = await fetchWithAuth(`${process.env.REACT_APP_CITY}/climate-count?climate=${climate}`);
            alert(`Количество объектов по climate "${climate}": ${count}`);
        } catch (error) {
            console.error(error);
            alert(`Ошибка при подсчете объектов с climate "${climate}": ${error.message}`);
        }
    };

    const handleSumMetersAboveSeaLevel = async () => {
        try {
            const total = await fetchWithAuth(`${process.env.REACT_APP_CITY}/sum-meters-above-sea-level`);
            if (total === null) {
                alert('Нет доступных городов для расчета суммы metersAboveSeaLevel.');
            } else {
                alert(`Сумма metersAboveSeaLevel: ${total}`);
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };


    const handleRouteToLargestCity = async () => {
        try {
            const distance = await fetchWithAuth(`${process.env.REACT_APP_CITY}/route-to-largest-city`);
            alert(`Длина маршрута до крупнейшего города: ${distance}`);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const handleCoordinateSubmit = async (coordinates) => {
        const { x, y, z } = coordinates;
        if (x === '' || y === '' || z === '') {
            alert('Пожалуйста, введите все координаты.');
            return;
        }

        try {
            const distance = await fetchWithAuth(
                `${process.env.REACT_APP_CITY}/route-from-user-to-largest-city?userX=${x}&userY=${y}&userZ=${z}`
            );
            alert(`Длина маршрута от (${x},${y},${z}) до крупнейшего города: ${distance}`);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div className="main-button-panel">
            <SelectableButton label="Удалить объект по government" options={[
                "MATRIARCHY",
                "PATRIARCHY",
                "PLUTOCRACY",
                "REPUBLIC",
                "JUNTA"
            ]} onSubmit={handleDeleteGovernment} />

            <ActionButton label="Рассчитать сумму metersAboveSeaLevel" onClick={handleSumMetersAboveSeaLevel} />

            <SelectableButton label="Количество объектов по climate" options={[
                "RAIN_FOREST",
                "OCEANIC",
                "STEPPE",
                "POLAR_ICECAP"
            ]} onSubmit={handleCountByClimate} />

            <ActionButton label="Длина маршрута от (0,0,0)" onClick={handleRouteToLargestCity} />

            <div style={{ position: 'relative', display: 'inline-block' }}>
                <ActionButton label="Маршрут до крупнейшего города" onClick={toggleCoordinateModal} />
                {isCoordinateModalOpen && (
                    <CoordinateInputModal
                        onClose={() => setCoordinateModalOpen(false)}
                        onSubmit={handleCoordinateSubmit}
                    />
                )}
            </div>
        </div>
    );
}

export default MainButtonPanel;
