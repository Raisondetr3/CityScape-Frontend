import React from 'react';
import './CoordinatesTable.css';
import editIcon from '../../../assets/edit-icon.svg';
import deleteIcon from '../../../assets/delete-icon.svg';

function CoordinatesTableRow({ coordinates, index, handleEdit, handleDelete, user, role }) {
    console.log('User object:', user);
    console.log('User ID:', user?.id);
    console.log('Coordinates CreatedBy ID:', coordinates.createdBy?.id);
    console.log('Role:', role);

    return (
        <div className={`coordinates-table-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
            <div>{coordinates.x || 'N/A'}</div>
            <div>{coordinates.y || 'N/A'}</div>
            <div className="action-icons">
                {(coordinates.createdBy?.id === user.id || role === 'ADMIN') ? (
                    <>
                        <img src={editIcon} alt="Edit" onClick={() => handleEdit(coordinates)} />
                        <img src={deleteIcon} alt="Delete" onClick={() => handleDelete(coordinates.id, coordinates)} />
                    </>
                ) : (
                    <div>Нет прав</div>
                )}
            </div>
        </div>
    );
}

export default CoordinatesTableRow;
