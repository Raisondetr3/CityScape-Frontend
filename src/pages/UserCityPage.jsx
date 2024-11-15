import React, { useState } from 'react';
import Header from '../components/Header/UserHeader';
import MainButtonsCity from '../components/Buttons/MainButtons/MainButtonsCity';
import '../styles/Main.css';
import SearchBar from "../components/SearchBar/SearchBar";
import MainButtonPanel from "../components/ActionControls/MainButtonPanel";
import CityTable from "../components/Tables/CityTable/CityTable";
import AddCityButton from "../components/Buttons/AddCityButton/AddCityButton";
import AddCityForm from "../components/Forms/CityForm/AddCityForm";

function UserCityPage({ onLogout, onRequestAdmin, role }) {
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
        <div className="admin-container">
            <Header onLogout={onLogout} onRequestAdmin={onRequestAdmin} />
            <MainButtonsCity role={role} />
            <div className="search-bar-wrapper">
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

export default UserCityPage;
