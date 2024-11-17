import React, { useState, useEffect } from 'react';
import '../Form.css';

const EditCityForm = ({ cityData, onClose, onSubmit }) => {
    const [city, setCity] = useState({ ...cityData });
    const [coordinatesList, setCoordinatesList] = useState([]);
    const [humanList, setHumanList] = useState([]);
    const [errors, setErrors] = useState({});

    const climateOptions = ['RAIN_FOREST', 'OCEANIC', 'STEPPE', 'POLAR_ICECAP'];
    const governmentOptions = ['MATRIARCHY', 'PATRIARCHY', 'PLUTOCRACY', 'REPUBLIC', 'JUNTA'];
    const standardOfLivingOptions = ['VERY_HIGH', 'HIGH', 'MEDIUM', 'NIGHTMARE'];

    const formatDateTime = (dateTimeStr) => {
        if (!dateTimeStr) return null;
        const date = new Date(dateTimeStr);

        if (isNaN(date.getTime())) {
            console.error('Недопустимая дата:', dateTimeStr);
            return null;
        }

        // Получение компонентове даты и времени в UTC
        const year = date.getUTCFullYear();
        const month = ('0' + (date.getUTCMonth() + 1)).slice(-2);
        const day = ('0' + date.getUTCDate()).slice(-2);
        const hours = ('0' + date.getUTCHours()).slice(-2);
        const minutes = ('0' + date.getUTCMinutes()).slice(-2);
        const seconds = ('0' + date.getUTCSeconds()).slice(-2);

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    };

    const formatDateTimeForInput = (dateTimeStr) => {
        if (!dateTimeStr) return '';
        const date = new Date(dateTimeStr);
        const isoString = date.toISOString();
        return isoString.slice(0, 16);
    };

    useEffect(() => {
        if (coordinatesList.length === 0) {
            fetchCoordinates();
        }
        if (humanList.length === 0) {
            fetchHumans();
        }

        setCity(prev => ({
            ...prev,
            useExistingCoordinates: prev.coordinates && prev.coordinates.id ? true : false,
            useExistingGovernor: prev.governor && prev.governor.id ? true : false,
        }));

        setCity(prev => ({
            ...prev,
            establishmentDate: formatDateTimeForInput(prev.establishmentDate),
            governor: {
                ...prev.governor,
                birthday: formatDateTimeForInput(prev.governor?.birthday),
            },
        }));
    }, [coordinatesList.length, humanList.length]);

    const fetchCoordinates = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_COORDINATES}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setCoordinatesList(data.content || []);
        } catch (error) {
            console.error('Ошибка загрузки Coordinates:', error);
        }
    };

    const fetchHumans = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_HUMAN}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setHumanList(data.content || []);
        } catch (error) {
            console.error('Ошибка загрузки данных Human:', error);
        }
    };

    const handleChange = (field, value) => {
        setCity(prev => ({
            ...prev,
            [field]: value,
        }));
        validateField(field, value);
    };

    const handleCoordinateChange = (field, value) => {
        setCity(prev => ({
            ...prev,
            coordinates: {
                ...prev.coordinates,
                [field]: value,
            },
        }));
        validateCoordinateField(field, value);
    };

    const handleGovernorChange = (field, value) => {
        setCity(prev => ({
            ...prev,
            governor: {
                ...prev.governor,
                [field]: value,
            },
        }));
        validateGovernorField(field, value);
    };

    const handleCoordinateSelect = (value) => {
        const selectedCoordinates = coordinatesList.find(coord => coord.id === Number(value));
        setCity(prev => ({
            ...prev,
            coordinates: selectedCoordinates,
        }));
        setErrors(prevErrors => ({ ...prevErrors, coordinates: '' }));
    };

    const handleGovernorSelect = (value) => {
        const selectedGovernor = humanList.find(human => human.id === Number(value));
        setCity(prev => ({
            ...prev,
            governor: selectedGovernor,
        }));
        setErrors(prevErrors => ({ ...prevErrors, governor: '' }));
    };

    const validateField = (field, value) => {
        let errorMsg = '';
        switch (field) {
            case 'name':
                if (!value || value.trim() === '') {
                    errorMsg = 'Название не может быть пустым';
                }
                break;
            case 'area':
                if (value === '' || isNaN(value) || Number(value) <= 0) {
                    errorMsg = 'Площадь должна быть больше 0';
                }
                break;
            case 'population':
                if (value === '' || isNaN(value) || Number(value) <= 0) {
                    errorMsg = 'Население должно быть больше 0';
                }
                break;
            case 'government':
                if (!value) {
                    errorMsg = 'Форма правления обязательна';
                }
                break;
            default:
                break;
        }
        setErrors(prevErrors => ({
            ...prevErrors,
            [field]: errorMsg,
        }));
    };

    const validateCoordinateField = (field, value) => {
        let errorMsg = '';
        if (!city.useExistingCoordinates) {
            switch (field) {
                case 'x':
                    if (value === '' || isNaN(value) || Number(value) > 820 || value === null) {
                        errorMsg = 'X должно быть числом не больше 820 и не может быть пустым';
                    }
                    break;
                default:
                    break;
            }
            setErrors(prevErrors => ({
                ...prevErrors,
                [`coordinates_${field}`]: errorMsg,
            }));
        }
    };

    const validateGovernorField = (field, value) => {
        let errorMsg = '';
        if (!city.useExistingGovernor) {
            switch (field) {
                case 'name':
                    if (!value || value.trim() === '') {
                        errorMsg = 'Имя губернатора не может быть пустым';
                    }
                    break;
                case 'age':
                    if (value === '' || isNaN(value) || Number(value) <= 0) {
                        errorMsg = 'Возраст должен быть больше 0';
                    }
                    break;
                case 'height':
                    if (value === '' || isNaN(value) || Number(value) <= 0) {
                        errorMsg = 'Рост должен быть больше 0';
                    }
                    break;
                default:
                    break;
            }
            setErrors(prevErrors => ({
                ...prevErrors,
                [`governor_${field}`]: errorMsg,
            }));
        }
    };

    const validateAllFields = () => {
        let valid = true;
        let newErrors = {};

        if (!city.name || city.name.trim() === '') {
            newErrors.name = 'Название не может быть пустым';
            valid = false;
        }

        if (city.area === '' || isNaN(city.area) || Number(city.area) <= 0) {
            newErrors.area = 'Площадь должна быть больше 0';
            valid = false;
        }

        if (city.population === '' || isNaN(city.population) || Number(city.population) <= 0) {
            newErrors.population = 'Население должно быть больше 0';
            valid = false;
        }

        if (!city.government) {
            newErrors.government = 'Форма правления обязательна';
            valid = false;
        }

        if (!city.coordinates) {
            newErrors.coordinates = 'Coordinates обязательны';
            valid = false;
        } else {
            if (!city.useExistingCoordinates) {
                if (city.coordinates.x === '' || isNaN(city.coordinates.x) || Number(city.coordinates.x) > 820) {
                    newErrors.coordinates_x = 'X должно быть числом не больше 820 и не может быть пустым';
                    valid = false;
                }
                // y не имеет ограничений
            }
        }

        if (!city.governor) {
            newErrors.governor = 'Губернатор обязателен';
            valid = false;
        } else {
            if (!city.useExistingGovernor) {
                if (!city.governor.name || city.governor.name.trim() === '') {
                    newErrors.governor_name = 'Имя губернатора не может быть пустым';
                    valid = false;
                }
                if (city.governor.age === '' || isNaN(city.governor.age) || Number(city.governor.age) <= 0) {
                    newErrors.governor_age = 'Возраст должен быть больше 0';
                    valid = false;
                }
                if (city.governor.height === '' || isNaN(city.governor.height) || Number(city.governor.height) <= 0) {
                    newErrors.governor_height = 'Рост должен быть больше 0';
                    valid = false;
                }
            }
        }

        setErrors(newErrors);
        return valid;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateAllFields();
        if (!isValid) {
            alert('Не получилось обновить City.');
            return;
        }

        const cityDataToUpdate = {
            id: city.id,
            name: city.name,
            area: city.area,
            population: city.population,
            climate: city.climate || null,
            government: city.government,
            coordinates: city.coordinates ? {
                id: city.coordinates.id,
                x: city.coordinates.x,
                y: city.coordinates.y
            } : null,
            capital: city.capital,
            metersAboveSeaLevel: city.metersAboveSeaLevel,
            standardOfLiving: city.standardOfLiving || null,
            establishmentDate: formatDateTime(city.establishmentDate),
            governor: city.governor ? {
                id: city.governor.id,
                name: city.governor.name,
                age: city.governor.age,
                height: city.governor.height,
                birthday: formatDateTime(city.governor.birthday),
            } : null,
        };


        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_CITY}/${city.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(cityDataToUpdate),
            });

            if (!response.ok) {
                throw new Error('Ошибка при обновлении City');
            }

            const updatedCity = await response.json();
            alert('City успешно обновлен!');
            onSubmit(updatedCity);
        } catch (error) {
            console.error(error);
            alert('Не удалось обновить City.');
        }
    };

    return (
        <div className="form-overlay">
            <div className="form-container">
                <h2>Редактировать City</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={city.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            required
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </label>
                    <label>
                        Area:
                        <input
                            type="number"
                            value={city.area}
                            onChange={(e) => handleChange('area', e.target.value)}
                            required
                        />
                        {errors.area && <span className="error">{errors.area}</span>}
                    </label>
                    <label>
                        Population:
                        <input
                            type="number"
                            value={city.population}
                            onChange={(e) => handleChange('population', e.target.value)}
                            required
                        />
                        {errors.population && <span className="error">{errors.population}</span>}
                    </label>
                    <label>
                        Climate:
                        <select
                            value={city.climate}
                            onChange={(e) => handleChange('climate', e.target.value)}
                        >
                            <option value="">Выберите климат</option>
                            {climateOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Government:
                        <select
                            value={city.government}
                            onChange={(e) => handleChange('government', e.target.value)}
                            required
                        >
                            <option value="">Выберите форму правления</option>
                            {governmentOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        {errors.government && <span className="error">{errors.government}</span>}
                    </label>
                    <fieldset>
                        <legend>Coordinates</legend>
                        <label className="radio-label">
                            <span>Создать новые</span>
                            <input
                                type="radio"
                                name="coordinatesOption"
                                checked={!city.useExistingCoordinates}
                                onChange={() => handleChange('useExistingCoordinates', false)}
                            />
                        </label>
                        {!city.useExistingCoordinates && (
                            <div>
                                <label>
                                    X:
                                    <input
                                        type="number"
                                        value={city.coordinates.x}
                                        onChange={(e) => handleCoordinateChange('x', e.target.value)}
                                        required
                                    />
                                    {errors.coordinates_x && <span className="error">{errors.coordinates_x}</span>}
                                </label>
                                <label>
                                    Y:
                                    <input
                                        type="number"
                                        value={city.coordinates.y}
                                        onChange={(e) => handleCoordinateChange('y', e.target.value)}
                                        required
                                    />
                                </label>
                            </div>
                        )}
                        <label className="radio-label">
                            <span>Выбрать существующие</span>
                            <input
                                type="radio"
                                name="coordinatesOption"
                                checked={city.useExistingCoordinates}
                                onChange={() => handleChange('useExistingCoordinates', true)}
                            />
                        </label>
                        {city.useExistingCoordinates && (
                            <select
                                onChange={(e) => handleCoordinateSelect(e.target.value)}
                                required
                            >
                                <option value="">Выберите Coordinates</option>
                                {coordinatesList.map((coord) => (
                                    <option key={coord.id} value={coord.id}>
                                        X: {coord.x}, Y: {coord.y}
                                    </option>
                                ))}
                            </select>
                        )}
                        {errors.coordinates && <span className="error">{errors.coordinates}</span>}
                    </fieldset>
                    <label className="capital-label">
                        Capital:
                        <input
                            type="checkbox"
                            checked={city.capital}
                            onChange={(e) => handleChange('capital', e.target.checked)}
                        />
                    </label>
                    <label>
                        Meters Above Sea Level:
                        <input
                            type="number"
                            value={city.metersAboveSeaLevel}
                            onChange={(e) => handleChange('metersAboveSeaLevel', e.target.value)}
                        />
                    </label>
                    <label>
                        Standard Of Living:
                        <select
                            value={city.standardOfLiving}
                            onChange={(e) => handleChange('standardOfLiving', e.target.value)}
                        >
                            <option value="">Выберите уровень жизни</option>
                            {standardOfLivingOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Establishment Date:
                        <input
                            type="datetime-local"
                            value={city.establishmentDate}
                            onChange={(e) => handleChange('establishmentDate', e.target.value)}
                        />
                    </label>
                    <fieldset>
                        <legend>Governor</legend>
                        <label className="radio-label">
                            <span>Создать нового</span>
                            <input
                                type="radio"
                                name="governorOption"
                                checked={!city.useExistingGovernor}
                                onChange={() => handleChange('useExistingGovernor', false)}
                            />
                        </label>
                        {!city.useExistingGovernor && (
                            <div>
                                <label>
                                    Name:
                                    <input
                                        type="text"
                                        value={city.governor.name}
                                        onChange={(e) => handleGovernorChange('name', e.target.value)}
                                        required
                                    />
                                    {errors.governor_name && <span className="error">{errors.governor_name}</span>}
                                </label>
                                <label>
                                    Age:
                                    <input
                                        type="number"
                                        value={city.governor.age}
                                        onChange={(e) => handleGovernorChange('age', e.target.value)}
                                        required
                                    />
                                    {errors.governor_age && <span className="error">{errors.governor_age}</span>}
                                </label>
                                <label>
                                    Height:
                                    <input
                                        type="number"
                                        value={city.governor.height}
                                        onChange={(e) => handleGovernorChange('height', e.target.value)}
                                        required
                                    />
                                    {errors.governor_height && <span className="error">{errors.governor_height}</span>}
                                </label>
                                <label>
                                    Birthday:
                                    <input
                                        type="datetime-local"
                                        value={city.governor.birthday}
                                        onChange={(e) => handleGovernorChange('birthday', e.target.value)}
                                    />
                                </label>
                            </div>
                        )}
                        <label className="radio-label">
                            <span>Выбрать существующего</span>
                            <input
                                type="radio"
                                name="governorOption"
                                checked={city.useExistingGovernor}
                                onChange={() => handleChange('useExistingGovernor', true)}
                            />
                        </label>
                        {city.useExistingGovernor && (
                            <select
                                onChange={(e) => handleGovernorSelect(e.target.value)}
                                required
                            >
                                <option value="">Выберите губернатора</option>
                                {humanList.map((human) => (
                                    <option key={human.id} value={human.id}>
                                        {human.name}
                                    </option>
                                ))}
                            </select>
                        )}
                        {errors.governor && <span className="error">{errors.governor}</span>}
                    </fieldset>
                    <button type="submit">Сохранить изменения</button>
                    <button type="button" onClick={onClose}>
                        Отмена
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditCityForm;
