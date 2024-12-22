import React, { useState } from 'react';
import Header from '../components/Headers/AdminHeader';
import MainButtonsCity from '../components/Buttons/MainButtons/MainButtonsCity';
import SearchBar from '../components/SearchBar/SearchBar';
import MainButtonPanel from '../components/ActionControls/MainButtonPanel';
import '../styles/Main.css';
import CityTable from '../components/Tables/CityTable/CityTable';
import AddCityButton from '../components/Buttons/AddButtons/AddCityButton';
import AddCityForm from '../components/Forms/CityForms/AddCityForm';
import ImportCityButton from "../components/Buttons/AddButtons/ImportCityButton";
import ImportHistoryButton from "../components/Buttons/AddButtons/ImportHistoryButton";
import ImportCityForm from "../components/Forms/CityForms/ImportCityForm";
import ImportHistory from "../components/Forms/CityForms/ImportHistory";

function AdminCityPage({ onLogout, onRequestAdmin, role }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [governorSearchTerm, setGovernorSearchTerm] = useState('');
    const [isFormOpen, setFormOpen] = useState(false);
    const [cities, setCities] = useState([]);
    const [isImportFormOpen, setIsImportFormOpen] = useState(false);
    const [showImportHistory, setShowImportHistory] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [historyRefreshTrigger, setHistoryRefreshTrigger] = useState(0);

    const fetchCities = async (page = 0, name = '', governorName = '') => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                `${process.env.REACT_APP_CITY}?page=${page}&name=${name}&governorName=${governorName}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            setCities(data.content || []);
            setCurrentPage(data.currentPage || 0);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
            setCities([]);
        }
    };

    const handleNameSearch = (term) => {
        setSearchTerm(term);
    };

    const handleGovernorSearch = (term) => {
        setGovernorSearchTerm(term);
    };

    const handleAddCity = () => {
        setFormOpen(true);
    };

    const handleFormClose = () => {
        setFormOpen(false);
    };

    const handleCityAdded = (newCity) => {
        setFormOpen(false);
        setCities((prevCities) => [...prevCities, newCity]);
    };

    const handleImportCity = () => {
        setIsImportFormOpen(true);
    };

    const handleShowImportHistory = () => {
        setShowImportHistory((prev) => !prev);
    };

    const handleImportSuccess = () => {
        setIsImportFormOpen(false);
        fetchCities(currentPage, searchTerm, governorSearchTerm);
    };

    return (
        <div className="main-container">
            <Header onLogout={onLogout} />
            <MainButtonsCity role={role} />
            <div className="search-bar-wrapper spread">
                <SearchBar placeholder="Искать по name" onSearch={handleNameSearch} />
                <div style={{ width: '105px' }}></div>
                <SearchBar placeholder="Искать по governor" onSearch={handleGovernorSearch} />
            </div>
            <MainButtonPanel />
            <div className="add-city-button-wrapper">
                <AddCityButton onClick={handleAddCity}/>
                <ImportCityButton onClick={handleImportCity}/>
                <ImportHistoryButton onClick={handleShowImportHistory}/>
            </div>
            <CityTable
                cities={cities}
                setCities={setCities}
                searchTerm={searchTerm}
                governorSearchTerm={governorSearchTerm}
            />
            {isImportFormOpen && (
                <ImportCityForm
                    onClose={() => setIsImportFormOpen(false)}
                    onImportSuccess={handleImportSuccess}
                />
            )}
            {showImportHistory && <ImportHistory refreshTrigger={historyRefreshTrigger} />}
            {isFormOpen && <AddCityForm onClose={handleFormClose} onSubmit={handleCityAdded} />}
        </div>
    );
}

export default AdminCityPage;
