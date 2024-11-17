import React, { useState } from 'react';
import Header from '../components/Headers/AdminHeader';
import MainButtonsCoordinates from '../components/Buttons/MainButtons/MainButtonsCoordinates';
import '../styles/Main.css';
import CoordinatesTable from "../components/Tables/CoordinatesTable/CoordinatesTable";
import AddCoordinatesButton from "../components/Buttons/AddButtons/AddCoordinatesButton";
import AddCoordinatesForm from "../components/Forms/CoordinatesForms/AddCoordinatesForm";

function AdminCoordinatesPage({ onLogout, role }) {
    const [isFormOpen, setFormOpen] = useState(false);
    const [coordinates, setCoordinates] = useState([]);

    const handleAddCoordinates = () => {
        setFormOpen(true);
    };

    const handleFormClose = () => {
        setFormOpen(false);
    };

    const handleCoordinatesAdded = (newCoordinates) => {
        setFormOpen(false);
        setCoordinates((prevCoordinates) => [...prevCoordinates, newCoordinates]);
    };

    return (
        <div className="main-container">
            <Header onLogout={onLogout} />
            <MainButtonsCoordinates role={role} />
            <div className="coordinates-content-wrapper">
                <div className="add-coordinates-button-wrapper">
                    <AddCoordinatesButton onClick={handleAddCoordinates} />
                </div>
                <CoordinatesTable
                    coordinates={coordinates}
                    setCoordinates={setCoordinates}
                />
            </div>
            {isFormOpen && <AddCoordinatesForm onClose={handleFormClose} onSubmit={handleCoordinatesAdded} />}
        </div>
    );
}

export default AdminCoordinatesPage;
