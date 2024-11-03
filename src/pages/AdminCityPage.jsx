import React from 'react';
import Header from '../components/Header/AdminHeader';
import MainButtonsCity from '../components/MainButtons/MainButtonsCity';
import '../styles/Main.css';

function AdminCityPage({ onLogout }) {
    return (
        <div className="admin-container">
            <Header onLogout={onLogout} />
            <MainButtonsCity />
        </div>
    );
}

export default AdminCityPage;


// const AdminCityPage = () => {
//     // const [requests, setRequests] = useState([]);
//     // const [showRequests, setShowRequests] = useState(false);
//     //
//     // // Функция для переключения видимости списка заявок
//     // const toggleRequests = async () => {
//     //     if (!showRequests) {
//     //         try {
//     //             const token = localStorage.getItem('token');
//     //             const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/admin-requests`, {
//     //                 headers: {
//     //                     'Authorization': `Bearer ${token}`
//     //                 }
//     //             });
//     //             const data = await response.json();
//     //             setRequests(data);
//     //         } catch (error) {
//     //             console.error('Ошибка при получении заявок:', error);
//     //         }
//     //     }
//     //     setShowRequests((prev) => !prev);
//     // };
//     //
//     // // Обработка одобрения заявки
//     // const handleApprove = async (userId) => {
//     //     try {
//     //         const token = localStorage.getItem('token');
//     //         await fetch(`${process.env.REACT_APP_API_BASE_URL}/approve-admin`, {
//     //             method: 'POST',
//     //             headers: {
//     //                 'Content-Type': 'application/json',
//     //                 'Authorization': `Bearer ${token}`
//     //             },
//     //             body: JSON.stringify({ userId }),
//     //         });
//     //         setRequests((prevRequests) => prevRequests.filter((req) => req.id !== userId));
//     //         alert('Права администратора предоставлены');
//     //     } catch (error) {
//     //         console.error('Ошибка при одобрении:', error);
//     //     }
//     // };
//     //
//     // // Обработка отклонения заявки
//     // const handleReject = async (userId) => {
//     //     try {
//     //         const token = localStorage.getItem('token');
//     //         await fetch(`${process.env.REACT_APP_API_BASE_URL}/reject-admin`, {
//     //             method: 'POST',
//     //             headers: {
//     //                 'Content-Type': 'application/json',
//     //                 'Authorization': `Bearer ${token}`
//     //             },
//     //             body: JSON.stringify({ userId }),
//     //         });
//     //         setRequests((prevRequests) => prevRequests.filter((req) => req.id !== userId));
//     //         alert('Заявка отклонена');
//     //     } catch (error) {
//     //         console.error('Ошибка при отклонении:', error);
//     //     }
//     // };
//     //
//     // // Обработка выхода из аккаунта
//     // const handleLogout = () => {
//     //     localStorage.removeItem('token');
//     //     alert('Вы успешно вышли из аккаунта');
//     //     // Здесь можно добавить логику перенаправления пользователя на страницу входа
//     // };
//     //
//     // return (
//     //     <div className="admin-container">
//     //         <Header onRequestClick={toggleRequests} onLogoutClick={handleLogout} />
//     //         {showRequests && (
//     //             <div className="requests-dropdown">
//     //                 {requests.length > 0 ? (
//     //                     requests.map((request) => (
//     //                         <div className="request-item" key={request.id}>
//     //                             <p>{request.username}</p>
//     //                             <button className="approve-button" onClick={() => handleApprove(request.id)}>Одобрить</button>
//     //                             <button className="reject-button" onClick={() => handleReject(request.id)}>Отклонить</button>
//     //                         </div>
//     //                     ))
//     //                 ) : (
//     //                     <p className="no-requests">Нет заявок на права администратора.</p>
//     //                 )}
//     //             </div>
//     //         )}
//     //     </div>
//     // );
// };

