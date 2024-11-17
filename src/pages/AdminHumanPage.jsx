import React, { useState } from 'react';
import Header from '../components/Headers/AdminHeader';
import MainButtonsHuman from '../components/Buttons/MainButtons/MainButtonsHuman';
import '../styles/Main.css';
import SearchBar from "../components/SearchBar/SearchBar";
import HumanTable from "../components/Tables/HumanTable/HumanTable";
import AddHumanButton from "../components/Buttons/AddButtons/AddHumanButton";
import AddHumanForm from "../components/Forms/HumanForms/AddHumanForm";

function AdminHumanPage({ onLogout, role }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setFormOpen] = useState(false);
    const [humans, setHumans] = useState([]);

    const handleNameSearch = (term) => {
        setSearchTerm(term);
    };

    const handleAddHuman = () => {
        setFormOpen(true);
    };

    const handleFormClose = () => {
        setFormOpen(false);
    };

    const handleHumanAdded = (newHuman) => {
        setFormOpen(false);
        setHumans((prevHumans) => [...prevHumans, newHuman]);
    };

    return (
        <div className="main-container">
            <Header onLogout={onLogout} />
            <MainButtonsHuman role={role} />
            <div className="search-bar-wrapper center">
                <SearchBar placeholder="Искать по name" onSearch={handleNameSearch} />
            </div>
            <div className="human-content-wrapper">
                <div className="add-human-button-wrapper">
                    <AddHumanButton onClick={handleAddHuman} />
                </div>
                <HumanTable
                    humans={humans}
                    setHumans={setHumans}
                    searchTerm={searchTerm}
                />
            </div>
            {isFormOpen && <AddHumanForm onClose={handleFormClose} onSubmit={handleHumanAdded} />}
        </div>
    );
}

export default AdminHumanPage;
