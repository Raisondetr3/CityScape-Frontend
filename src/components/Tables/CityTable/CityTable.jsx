import React, { useEffect, useState, useContext } from 'react';
import './CityTable.css';
import editIcon from '../../../assets/edit-icon.svg';
import deleteIcon from '../../../assets/delete-icon.svg';
import EditCityForm from '../../Forms/CityForms/EditCityForm';
import { UserContext } from '../../../UserContext';

function CityTable({ cities = [], setCities, searchTerm, governorSearchTerm }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [cityToEdit, setCityToEdit] = useState(null);

    const { user, role } = useContext(UserContext);

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

    const handleDelete = async (id, city) => {
        if (city.createdBy?.id !== user.userId && role !== 'ADMIN') {
            alert('У вас нет разрешения на удаление этого города.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_CITY}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                if (response.status === 403) {
                    alert('У вас нет разрешения на удаление этого города.');
                } else {
                    alert('Ошибка при удалении города.');
                }
                return;
            }

            setCities((prevCities) => prevCities.filter((city) => city.id !== id));
            alert('Город успешно удалён.');
        } catch (error) {
            console.error('Ошибка при удалении:', error);
            alert('Ошибка при удалении города.');
        }
    };

    const handleEdit = (city) => {
        if (city.createdBy?.id !== user.userId && role !== 'ADMIN') {
            alert('У вас нет разрешения на редактирование этого города.');
            return;
        }
        setCityToEdit(city);
        setIsEditFormOpen(true);
    };

    const handleEditFormClose = () => {
        setIsEditFormOpen(false);
        setCityToEdit(null);
    };

    const handleCityUpdated = (updatedCity) => {
        setIsEditFormOpen(false);
        setCities((prevCities) =>
            prevCities.map((city) => (city.id === updatedCity.id ? updatedCity : city))
        );
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
                    cities.map((city, index) =>
                        city ? (
                            <div className={`table-row ${index % 2 === 0 ? 'even' : 'odd'}`} key={city.id}>
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
                        ) : (
                            <div key={index} className="table-row no-data">
                                Некорректные данные
                            </div>
                        )
                    )
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
            {isEditFormOpen && cityToEdit && (
                <EditCityForm
                    cityData={cityToEdit}
                    onClose={handleEditFormClose}
                    onSubmit={handleCityUpdated}
                />
            )}
        </div>
    );
}

export default CityTable;
