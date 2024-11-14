import React from 'react';
import './CityTable.css';
import editIcon from '../../../assets/edit-icon.svg';
import deleteIcon from '../../../assets/delete-icon.svg';

function CityTableRow({ city }) {
    const handleEdit = () => {
        // Здесь будет логика редактирования объекта
        console.log(`Редактировать ${city.name}`);
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${process.env.REACT_APP_CITY}/${city.name}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                alert(`Город ${city.name} удален`);
            } else {
                alert('Ошибка при удалении города');
            }
        } catch (error) {
            console.error('Ошибка при удалении города:', error);
        }
    };

    return (
        <div className={`city-table-row ${city.id % 2 === 0 ? 'even-row' : 'odd-row'}`}>
            <div className="row-cell">{city.name}</div>
            <div className="row-cell">X: {city.coordinates.x}, Y: {city.coordinates.y}</div>
            <div className="row-cell">{city.creationDate}</div>
            <div className="row-cell">{city.area}</div>
            <div className="row-cell">{city.population}</div>
            <div className="row-cell">{city.establishmentDate}</div>
            <div className="row-cell">{String(city.capital)}</div>
            <div className="row-cell">{city.metersAboveSeaLevel}</div>
            <div className="row-cell">{city.climate}</div>
            <div className="row-cell">{city.government}</div>
            <div className="row-cell">{city.standardOfLiving}</div>
            <div className="row-cell">
                <a href={`/humans/${city.governor.id}`} className="link-text">{city.governor.name}</a>
            </div>
            <div className="row-cell actions-cell">
                <img src={editIcon} alt="Edit" onClick={handleEdit} />
                <img src={deleteIcon} alt="Delete" onClick={handleDelete} />
            </div>
        </div>
    );
}

export default CityTableRow;
