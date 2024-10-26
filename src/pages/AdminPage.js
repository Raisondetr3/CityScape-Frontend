import React, { useState, useEffect } from 'react';

const AdminPage = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        // Получаем список заявок на роль администратора
        const fetchRequests = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin-requests`, {
                    method: 'GET',
                });
                const data = await response.json();
                setRequests(data);
            } catch (error) {
                console.error('Ошибка при получении заявок', error);
            }
        };

        fetchRequests();
    }, []);

    const handleApprove = async (userId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/approve-admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });

            if (response.ok) {
                setRequests((prevRequests) => prevRequests.filter((req) => req.userId !== userId));
                alert('Права администратора предоставлены');
            }
        } catch (error) {
            console.error('Ошибка при одобрении', error);
        }
    };

    const handleReject = (userId) => {
        setRequests((prevRequests) => prevRequests.filter((req) => req.userId !== userId));
        alert('Заявка отклонена');
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Заявки на права администратора:</p>
            {requests.length > 0 ? (
                <ul>
                    {requests.map((request) => (
                        <li key={request.userId}>
                            <p>Пользователь: {request.username}</p>
                            <button onClick={() => handleApprove(request.userId)}>Одобрить</button>
                            <button onClick={() => handleReject(request.userId)}>Отклонить</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Нет заявок на права администратора.</p>
            )}
        </div>
    );
};

export default AdminPage;

