import React, { useState } from 'react';
import Header from '../components/Headers/AdminHeader';
import MainButtonsCity from '../components/Buttons/MainButtons/MainButtonsCity';
import SearchBar from '../components/SearchBar/SearchBar';
import MainButtonPanel from '../components/ActionControls/MainButtonPanel';
import '../styles/Main.css';
import CityTable from '../components/Tables/CityTable/CityTable';
import AddCityButton from '../components/Buttons/AddButtons/AddCityButton';
import AddCityForm from '../components/Forms/CityForms/AddCityForm';

function AdminCityPage({ onLogout, role }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [governorSearchTerm, setGovernorSearchTerm] = useState('');
    const [isFormOpen, setFormOpen] = useState(false);
    const [cities, setCities] = useState([]);

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
                <AddCityButton onClick={handleAddCity} />
            </div>
            <CityTable
                cities={cities}
                setCities={setCities}
                searchTerm={searchTerm}
                governorSearchTerm={governorSearchTerm}
            />
            {isFormOpen && <AddCityForm onClose={handleFormClose} onSubmit={handleCityAdded} />}
        </div>
    );
}

export default AdminCityPage;
