import React, { useState } from 'react';
import OptionModal from './OptionModal';
import './SelectableButton.css';

function SelectableButton({ label, options, onSubmit }) {
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    const handleOptionSelect = async (option) => {
        console.log(`Option selected: ${option}`);
        setModalOpen(false);
        try {
            await onSubmit(option);
        } catch (error) {
            console.error(error);
            alert(`Произошла ошибка: ${error.message}`);
        }
    };

    return (
        <div className="selectable-button-container">
            <button className="selectable-button" onClick={toggleModal}>
                {label}
            </button>
            {isModalOpen && <OptionModal options={options} onSelect={handleOptionSelect} onClose={toggleModal} />}
        </div>
    );
}

export default SelectableButton;
