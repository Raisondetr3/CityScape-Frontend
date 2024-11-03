import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';

const UserPage = () => {
    const { user, requestStatus, hasRequestedAdminRole, requestAdminRole } = useContext(UserContext);
    const [statusMessage, setStatusMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAdminRequest = async () => {
        setLoading(true);
        try {
            const message = await requestAdminRole(user.userId);
            setStatusMessage(message);
        } catch (error) {
            console.error('Ошибка при отправке заявки:', error);
            setStatusMessage('Ошибка при отправке заявки.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="user-container">
            <header className="header">
                <h1 className="title">User Dashboard</h1>
                <button className="logout-button">Выйти</button>
            </header>
            <p>Добро пожаловать, {user?.username}!</p>
            <p className="request-status">
                Статус заявки на администратора:{" "}
                {hasRequestedAdminRole ? (
                    requestStatus === 'pending' ? 'Ваша заявка на администратора находится в ожидании.'
                        : requestStatus === 'accepted' ? 'Ваша заявка одобрена. Вы теперь администратор.'
                            : 'Ваша заявка отклонена.'
                ) : (
                    'Вы еще не отправили запрос.'
                )}
            </p>
            <button
                className="admin-request-button"
                onClick={handleAdminRequest}
                disabled={loading || requestStatus === 'pending'}
            >
                {loading ? 'Отправка...' : 'Запросить права администратора'}
            </button>
        </div>
    );
};

export default UserPage;
