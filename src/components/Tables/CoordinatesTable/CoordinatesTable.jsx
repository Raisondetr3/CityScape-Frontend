import React, { useEffect, useState, useContext } from 'react';
import './CoordinatesTable.css';
import { UserContext } from '../../../UserContext';
import CoordinatesTableHeader from './CoordinatesTableHeader';
import CoordinatesTableRow from './CoordinatesTableRow';
import PaginationControls from '../../Pagination/PaginationControls';
import EditCoordinatesForm from "../../Forms/CoordinatesForms/EditCoordinatesForm";

function CoordinatesTable({ coordinates = [], setCoordinates }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [coordinatesToEdit, setCoordinatesToEdit] = useState(null);

    const { user, role } = useContext(UserContext);

    useEffect(() => {
        fetchCoordinates(currentPage);
    }, [currentPage]);

    const fetchCoordinates = async (page) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_COORDINATES}?page=${page}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            setCoordinates(data.content || []);
            setCurrentPage(data.currentPage || 0);
            setTotalPages(data.totalPages || 0);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
            setCoordinates([]);
        }
    };



    const handleDelete = async (id, coordinates) => {
        if (coordinates.createdBy?.id !== user.id && role !== 'ADMIN') {
            alert('У вас нет разрешения на удаление этих Coordinates.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_COORDINATES}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorMessage = response.status === 403
                    ? 'У вас нет разрешения на удаление этих Coordinates'
                    : response.status === 409
                        ? 'Невозможно удалить Coordinates, поскольку он связан с одним или несколькими Cities'
                        : 'Невозможно удалить Coordinates, поскольку он связан с одним или несколькими Cities';
                alert(errorMessage);
                return;
            }

            setCoordinates((prevCoordinates) => prevCoordinates.filter((item) => item.id !== id));
            alert('Coordinates успешно удалены');
        } catch (error) {
            console.error('Ошибка при удалении Coordinates:', error);
            alert('Ошибка при удалении Coordinates.');
        }
    };

    const handleEdit = (coordinates) => {
        if (coordinates.createdBy?.id !== user.id && role !== 'ADMIN') {
            alert('У вас нет разрешения на редактирование этих Coordinates.');
            return;
        }
        setCoordinatesToEdit(coordinates);
        setIsEditFormOpen(true);
    };

    const handleEditFormClose = () => {
        setIsEditFormOpen(false);
        setCoordinatesToEdit(null);
    };

    const handleCoordinatesUpdated = (updatedCoordinates) => {
        setIsEditFormOpen(false);
        setCoordinates((prevCoordinates) =>
            prevCoordinates.map((item) => (item.id === updatedCoordinates.id ? updatedCoordinates : item))
        );
    };

    console.log('Данные Сoordinates:', JSON.stringify(coordinates, null, 2));

    console.log('Данные User:', JSON.stringify(user, null, 2));

    return (
        <div className="coordinates-table-wrapper">
            <div className="coordinates-table-container">
                <CoordinatesTableHeader />
                {coordinates.length === 0 ? (
                    <div className="no-data">Не создано ни одного объекта</div>
                ) : (
                    coordinates.map((item, index) =>
                        item ? (
                            <CoordinatesTableRow
                                key={item.id}
                                coordinates={item}
                                index={index}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                                user={user}
                                role={role}
                            />
                        ) : (
                            <div key={index} className="coordinates-table-row no-data">
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
            {isEditFormOpen && coordinatesToEdit && (
                <EditCoordinatesForm
                    coordinatesData={coordinatesToEdit}
                    onClose={handleEditFormClose}
                    onSubmit={handleCoordinatesUpdated}
                />
            )}
        </div>
    );
}

export default CoordinatesTable;
