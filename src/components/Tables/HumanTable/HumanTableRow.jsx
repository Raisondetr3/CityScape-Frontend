import React from 'react';
import './HumanTable.css';
import editIcon from '../../../assets/edit-icon.svg';
import deleteIcon from '../../../assets/delete-icon.svg';

function HumanTableRow({ human, index, handleEdit, handleDelete, user, role }) {
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            return new Date(dateString).toLocaleDateString('ru-RU', options);
        } catch (error) {
            console.error('Ошибка форматирования даты:', error);
            return 'N/A';
        }
    };

    return (
        <div className={`human-table-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
            <div>{human.name || 'N/A'}</div>
            <div>{human.age || 'N/A'}</div>
            <div>{human.height || 'N/A'}</div>
            <div>{formatDate(human.birthday)}</div>
            <div className="action-icons">
                {(human.createdBy?.id === user.userId || role === 'ADMIN') ? (
                    <>
                        <img src={editIcon} alt="Edit" onClick={() => handleEdit(human)} />
                        <img src={deleteIcon} alt="Delete" onClick={() => handleDelete(human.id, human)} />
                    </>
                ) : (
                    <div>Нет прав</div>
                )}
            </div>
        </div>
    );
}

export default HumanTableRow;
