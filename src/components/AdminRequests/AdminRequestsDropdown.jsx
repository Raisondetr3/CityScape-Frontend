import React, { useEffect, useState } from 'react';
import RequestRow from './RequestRow';
import './AdminRequestsDropdown.css';

const AdminRequestsDropdown = ({ isVisible }) => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        if (isVisible) {
            console.log('Выполняется запрос на загрузку заявок администратора');
            fetchAdminRequests();
        }
    }, [isVisible]);


    const fetchAdminRequests = async () => {
        console.log('fetchAdminRequests вызван');
        try {
            const token = localStorage.getItem('token');
            console.log('Отправляемый запрос:', {
                url: `${process.env.REACT_APP_AUTH}/admin-requests`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const response = await fetch(`${process.env.REACT_APP_AUTH}/admin-requests`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log('Ответ сервера:', response);

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Ошибка при загрузке заявок администратора:", response.status, errorText);
                setRequests([]);
                return;
            }

            const requests = await response.json();
            console.log('Полученные данные:', requests);
            setRequests(requests);
        } catch (error) {
            console.error('Ошибка при получении заявок администратора:', error);
            setRequests([]);
        }
    };




    const handleApprove = async (userId) => {
        const token = localStorage.getItem('token');
        try {
            await fetch(`${process.env.REACT_APP_AUTH}/approve-admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ userId }),
            });
            setRequests((prevRequests) => prevRequests.filter(request => request.id !== userId));
            alert("Права администратора предоставлены.");
        } catch (error) {
            console.error("Ошибка при одобрении заявки:", error);
        }
    };

    const handleReject = async (userId) => {
        const token = localStorage.getItem('token');
        try {
            await fetch(`${process.env.REACT_APP_API_BASE_URL}/reject-admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ userId }),
            });
            setRequests((prevRequests) => prevRequests.filter(request => request.id !== userId));
            alert("Заявка на права администратора отклонена.");
        } catch (error) {
            console.error("Ошибка при отклонении заявки:", error);
        }
    };

    return (
        <div className={`admin-requests-dropdown ${isVisible ? 'visible' : ''}`}>
            {requests.length > 0 ? (
                requests.map((request) => (
                    <RequestRow
                        key={request.id}
                        username={request.username}
                        onApprove={() => handleApprove(request.id)}
                        onReject={() => handleReject(request.id)}
                    />
                ))
            ) : (
                <p className="no-requests">Нет заявок на права администратора.</p>
            )}
        </div>
    );
};

export default AdminRequestsDropdown;
