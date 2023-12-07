import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';

function SearchComponent() {
    const [searchText, setSearchText] = useState('');
    const [selectedOption, setSelectedOption] = useState('All');
    const [showDropdown, setShowDropdown] = useState(false);
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        fetch(`http://54.219.143.67:5001/search?category=${selectedOption}&searchTerm=${searchText}`)
            .then((response) => response.json())
            .then((data) => {
                setResults(data);
            })
            .catch((error) => {
                console.error('API error:', error);
            });
    };

    const cardStyle = {
        border: '1px solid #ddd',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        cursor: 'pointer',
        width: '100%', // Ajustamos el ancho para que ocupe toda la pantalla
        marginBottom: '15px',
    };

    const imageStyle = {
        maxWidth: '150px',
        height: 'auto',
        borderRadius: '4px',
        marginRight: '10px',
    };

    return (
        <div style={{ marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>
            <div className="d-flex justify-content-center" style={{ marginTop: '0px' }}>
                <div className="col-md-6">
                    <div className="input-group">
                        <Dropdown show={showDropdown} onToggle={(isOpen) => setShowDropdown(isOpen)} className="mr-2">
                            <Dropdown.Toggle variant="outline-secondary" style={{ borderRadius: '4px 0 0 4px' }}>
                                {selectedOption}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setSelectedOption('Math')}>Math</Dropdown.Item>
                                <Dropdown.Item onClick={() => setSelectedOption('CSC')}>CSC</Dropdown.Item>
                                <Dropdown.Item onClick={() => setSelectedOption('Physics')}>Physics</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            style={{ maxWidth: '500px', marginLeft: '-10px', marginRight: '-10px'}}
                        />
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={handleSearch}
                            style={{ marginLeft: '5px' }}
                        >
                            🔍
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '20px', width: '100%' }}> {/* Ajustamos el ancho del contenedor de las tarjetas */}
                {results.map((result, index) => (
                    <div key={index} style={cardStyle}>
                        <img
                            src={result.profilePicture}
                            alt="Profile"
                            style={imageStyle}
                        />
                        <div>
                            <h3 style={{ color: '#333' }}>Tutor Name: {result.tutorName}</h3>
                            <p style={{ margin: '8px 0', color: '#666' }}>Description: {result.description}</p>
                            <p style={{ margin: '8px 0', color: '#666' }}>Topic Name: {result.topicName}</p>
                            <p style={{ margin: '8px 0', color: '#666' }}>Resume: {result.resume}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchComponent;
