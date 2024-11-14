import React, { useState } from 'react';
import Header from '../components/Header/AdminHeader';
import MainButtonsCity from '../components/Buttons/MainButtons/MainButtonsCity';
import SearchBar from '../components/SearchBar/SearchBar';
import MainButtonPanel from '../components/ActionControls/MainButtonPanel';
import '../styles/Main.css';
import CityTable from "../components/Tables/CityTable/CityTable";

function AdminCityPage({ onLogout, role }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [governorSearchTerm, setGovernorSearchTerm] = useState('');

    const handleNameSearch = (term) => {
        setSearchTerm(term);
    };

    const handleGovernorSearch = (term) => {
        setGovernorSearchTerm(term);
    };

    return (
        <div className="admin-container">
            <Header onLogout={onLogout} />
            <MainButtonsCity role={role} />
            <div className="search-bar-wrapper">
                <SearchBar placeholder="Искать по name" onSearch={handleNameSearch} />
                <div style={{ width: '105px' }}></div>
                <SearchBar placeholder="Искать по governor" onSearch={handleGovernorSearch} />
            </div>
            <MainButtonPanel />
            <CityTable searchTerm={searchTerm} governorSearchTerm={governorSearchTerm} />
        </div>
    );
}

export default AdminCityPage;
