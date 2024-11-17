import React from 'react';
import './CityTable.css';
import editIcon from '../../../assets/edit-icon.svg';
import deleteIcon from '../../../assets/delete-icon.svg';

function CityTableRow({ city, index, handleEdit, handleDelete, user, role }) {
    return (
        <div className={`city-table-row ${index % 2 === 0 ? 'even' : 'odd'}`} key={city.id}>
            <div>{city.name || 'N/A'}</div>
            <div>
                {city.coordinates
                    ? `X: ${city.coordinates.x}, Y: ${city.coordinates.y}`
                    : 'N/A'}
            </div>
            <div>{city.creationDate || 'N/A'}</div>
            <div>{city.area || 'N/A'}</div>
            <div>{city.population || 'N/A'}</div>
            <div>{city.establishmentDate || 'N/A'}</div>
            <div>{String(city.capital) || 'N/A'}</div>
            <div>{city.metersAboveSeaLevel || 'N/A'}</div>
            <div>{city.climate || 'N/A'}</div>
            <div>{city.government || 'N/A'}</div>
            <div>{city.standardOfLiving || 'N/A'}</div>
            <div className="governor-link">
                {city.governor?.name || 'N/A'}
            </div>
            <div className="action-icons">
                {(city.createdBy?.id === user.userId || role === 'ADMIN') ? (
                    <>
                        <img src={editIcon} alt="Edit" onClick={() => handleEdit(city)} />
                        <img src={deleteIcon} alt="Delete" onClick={() => handleDelete(city.id, city)} />
                    </>
                ) : (
                    <div>Нет прав</div>
                )}
            </div>
        </div>
    );
}

export default CityTableRow;
