import React, { useEffect, useState, useContext } from 'react';
import './../../Tables/CityTable/CityTable.css';
import { UserContext } from '../../../UserContext';

const ImportHistory = ({ refreshTrigger }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user, role } = useContext(UserContext);

    const fetchHistory = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/import/history`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Ошибка загрузки истории импорта.');
            }

            const data = await response.json();

            const filteredHistory =
                role === 'ADMIN'
                    ? data
                    : data.filter((operation) => operation.username === user.username);
            setHistory(filteredHistory);
        } catch (err) {
            console.error(err);
            setError('Не удалось загрузить историю.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchHistory();
    }, [refreshTrigger, user, role]);

    const formatStatus = (status) => {
        switch (status) {
            case 'SUCCESS':
                return <span style={{ color: 'green', fontWeight: 'bold' }}>Успех</span>;
            case 'FAILURE':
                return <span style={{ color: 'red', fontWeight: 'bold' }}>Ошибка</span>;
            case 'IN_PROGRESS':
                return <span style={{ color: '#FFA500', fontWeight: 'bold' }}>В процессе</span>;
            default:
                return status;
        }
    };

    return (
        <div className="history-container">
            <h2>История импорта</h2>
            {loading ? (
                <p>Загрузка...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : history.length === 0 ? (
                <p className="no-data">История импорта пуста.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID операции</th>
                        <th>Статус</th>
                        <th>Добавлено объектов</th>
                        <th>Пользователь</th>
                        <th>Дата и время</th>
                        <th>Файл</th> {/* Новый столбец для файла */}
                    </tr>
                    </thead>
                    <tbody>
                    {history.map((operation) => (
                        <tr key={operation.id}>
                            <td>{operation.id}</td>
                            <td>{formatStatus(operation.status)}</td>
                            <td>{operation.objectsAdded}</td>
                            <td>{operation.username}</td>
                            <td>{new Date(operation.timestamp).toLocaleString()}</td>
                            <td>
                                {operation.fileDownloadUrl ? (
                                    <a href={operation.fileDownloadUrl} target="_blank" rel="noopener noreferrer">
                                        Скачать
                                    </a>
                                ) : (
                                    <span>Нет файла</span>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ImportHistory;
