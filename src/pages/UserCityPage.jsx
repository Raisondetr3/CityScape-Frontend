import React, { useState } from 'react';
import Header from '../components/Header/UserHeader';
import MainButtonsCity from '../components/Buttons/MainButtons/MainButtonsCity';
import '../styles/Main.css';
import SearchBar from "../components/SearchBar/SearchBar";
import MainButtonPanel from "../components/ActionControls/MainButtonPanel";
import CityTable from "../components/Tables/CityTable/CityTable";

function UserCityPage({ onLogout, onRequestAdmin, role }) {
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
            <Header onLogout={onLogout} onRequestAdmin={onRequestAdmin} />
            <MainButtonsCity role={role} />
            <div className="search-bar-wrapper">
                <SearchBar placeholder="Искать по name" onSearch={handleNameSearch} />
                <div style={{ width: '105px' }}></div> {/* Разделитель */}
                <SearchBar placeholder="Искать по governor" onSearch={handleGovernorSearch} />
            </div>
            <MainButtonPanel />
            <CityTable searchTerm={searchTerm} governorSearchTerm={governorSearchTerm} />
        </div>
    );
}

export default UserCityPage;
