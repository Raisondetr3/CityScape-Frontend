import React, { useEffect, useState, useContext } from 'react';
import './CityTable.css';
import { UserContext } from '../../../UserContext';
import CityTableHeader from './CityTableHeader';
import CityTableRow from './CityTableRow';
import EditCityForm from '../../Forms/CityForms/EditCityForm';
import PaginationControls from '../../Pagination/PaginationControls';

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
            alert('У вас нет разрешения на удаление этого City.');
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
                    alert('У вас нет разрешения на удаление этого City');
                } else {
                    alert('Ошибка при удалении City');
                }
                return;
            }

            setCities((prevCities) => prevCities.filter((city) => city.id !== id));
            alert('City успешно удалён.');
        } catch (error) {
            console.error('Ошибка при удалении:', error);
            alert('Ошибка при удалении City.');
        }
    };

    const handleEdit = (city) => {
        if (city.createdBy?.id !== user.id || role !== 'ADMIN') {
            alert('У вас нет разрешения на редактирование этого City.');
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
                <CityTableHeader />
                {cities.length === 0 ? (
                    <div className="no-data">Не создано ни одного объекта</div>
                ) : (
                    cities.map((city, index) =>
                        city ? (
                            <CityTableRow
                                key={city.id}
                                city={city}
                                index={index}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                                user={user}
                                role={role}
                            />
                        ) : (
                            <div key={index} className="city-table-row no-data">
                                Некорректные данные
                            </div>
                        )
                    )
                )}
            </div>
            {totalPages > 1 && (
                <PaginationControls
                    onPrevious={() => setCurrentPage(currentPage - 1)}
                    onNext={() => setCurrentPage(currentPage + 1)}
                    isFirstPage={currentPage === 0}
                    isLastPage={currentPage === totalPages - 1}
                />
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
