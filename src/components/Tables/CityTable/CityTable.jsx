import React, { useEffect, useState } from 'react';
import './CityTable.css';
import editIcon from '../../../assets/edit-icon.svg';
import deleteIcon from '../../../assets/delete-icon.svg';

function CityTable({ searchTerm, governorSearchTerm }) {
    const [cities, setCities] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchCities(currentPage, searchTerm, governorSearchTerm);
    }, [currentPage, searchTerm, governorSearchTerm]);

    const fetchCities = async (page, name, governorName) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_CITY}?page=${page}&name=${name || ''}&governorName=${governorName || ''}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setCities(data.content || []);
            setCurrentPage(data.currentPage || 0);
            setTotalPages(data.totalPages || 0);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
            setCities([]);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`${process.env.REACT_APP_CITY}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            fetchCities(currentPage, searchTerm, governorSearchTerm);
        } catch (error) {
            console.error('Ошибка при удалении:', error);
        }
    };

    const handleEdit = (id) => {
        alert(`Редактировать объект с ID ${id}`);
    };

    return (
        <div className="city-table-wrapper">
            <div className="city-table-container">
                <div className="table-header">
                    <div>name</div>
                    <div>coordinates</div>
                    <div>creationDate</div>
                    <div>area</div>
                    <div>population</div>
                    <div>establishmentDate</div>
                    <div>capital</div>
                    <div>MASL</div>
                    <div>climate</div>
                    <div>government</div>
                    <div>SoL</div>
                    <div>governor</div>
                    <div></div>
                </div>
                {cities.length === 0 ? (
                    <div className="no-data">Не создано ни одного объекта</div>
                ) : (
                    cities.map((city, index) => (
                        <div className={`table-row ${index % 2 === 0 ? 'even' : 'odd'}`} key={city.id}>
                            <div>{city.name}</div>
                            <div>X: {city.coordinates.x}, Y: {city.coordinates.y}</div>
                            <div>{city.creationDate}</div>
                            <div>{city.area}</div>
                            <div>{city.population}</div>
                            <div>{city.establishmentDate}</div>
                            <div>{String(city.capital)}</div>
                            <div>{city.metersAboveSeaLevel}</div>
                            <div>{city.climate}</div>
                            <div>{city.government}</div>
                            <div>{city.standardOfLiving}</div>
                            <div className="governor-link">{city.governor.name}</div>
                            <div className="action-icons">
                                <img src={editIcon} alt="Edit" onClick={() => handleEdit(city.id)} />
                                <img src={deleteIcon} alt="Delete" onClick={() => handleDelete(city.id)} />
                            </div>
                        </div>
                    ))
                )}
            </div>
            {totalPages > 1 && (
                <div className="pagination-controls">
                    {currentPage > 0 && (
                        <button onClick={() => setCurrentPage(currentPage - 1)}>Назад</button>
                    )}
                    {currentPage < totalPages - 1 && (
                        <button onClick={() => setCurrentPage(currentPage + 1)}>Вперёд</button>
                    )}
                </div>
            )}
        </div>
    );
}

export default CityTable;
