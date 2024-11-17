import React, { useEffect, useState, useContext } from 'react';
import './HumanTable.css';
import { UserContext } from '../../../UserContext';
import HumanTableHeader from './HumanTableHeader';
import HumanTableRow from './HumanTableRow';
import PaginationControls from '../../Pagination/PaginationControls';
import EditHumanForm from "../../Forms/HumanForms/EditHumanForm";

function HumanTable({ humans = [], setHumans, searchTerm }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [humanToEdit, setHumanToEdit] = useState(null);

    const { user, role } = useContext(UserContext);

    useEffect(() => {
        fetchHumans(currentPage, searchTerm);
    }, [currentPage, searchTerm]);

    const fetchHumans = async (page, name) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_HUMAN}?page=${page}&name=${name || ''}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setHumans(data.content || []);
            setCurrentPage(data.currentPage || 0);
            setTotalPages(data.totalPages || 0);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
            setHumans([]);
        }
    };

    const handleDelete = async (id, human) => {
        if (human.createdBy?.id !== user.userId && role !== 'ADMIN') {
            alert('У вас нет разрешения на удаление этого Humanа.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_HUMAN}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                if (response.status === 403) {
                    alert('У вас нет разрешения на удаление этого Humanа');
                } else if (response.status === 500) {
                    alert('Невозможно удалить Human, поскольку он связан с одним или несколькими Cities');
                } else {
                    alert('Ошибка при удалении Humanа');
                }
                return;
            }

            setHumans((prevHumans) => prevHumans.filter((human) => human.id !== id));
            alert('Human успешно удалён');
        } catch (error) {
            console.error('Ошибка при удалении:', error);
            alert('Ошибка при удалении Humanа');
        }
    };

    const handleEdit = (human) => {
        if (human.createdBy?.id !== user.userId && role !== 'ADMIN') {
            alert('У вас нет разрешения на редактирование этого Humanа.');
            return;
        }
        setHumanToEdit(human);
        setIsEditFormOpen(true);
    };

    const handleEditFormClose = () => {
        setIsEditFormOpen(false);
        setHumanToEdit(null);
    };

    const handleHumanUpdated = (updatedHuman) => {
        setIsEditFormOpen(false);
        setHumans((prevHumans) =>
            prevHumans.map((human) => (human.id === updatedHuman.id ? updatedHuman : human))
        );
    };

    return (
        <div className="human-table-wrapper">
            <div className="human-table-container">
                <HumanTableHeader />
                {humans.length === 0 ? (
                    <div className="no-data">Не создано ни одного объекта</div>
                ) : (
                    humans.map((human, index) =>
                        human ? (
                            <HumanTableRow
                                key={human.id}
                                human={human}
                                index={index}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                                user={user}
                                role={role}
                            />
                        ) : (
                            <div key={index} className="human-table-row no-data">
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
            {isEditFormOpen && humanToEdit && (
                <EditHumanForm
                    humanData={humanToEdit}
                    onClose={handleEditFormClose}
                    onSubmit={handleHumanUpdated}
                />
            )}
        </div>
    );
}

export default HumanTable;
