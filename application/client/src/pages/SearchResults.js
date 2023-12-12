// SearchResults.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SearchResults = () => {
    const location = useLocation();
    const { searchText, selectedOption } = location.state || {};
    console.log(searchText, selectedOption);

    const [results, setResults] = useState([]);

    useEffect(() => {
        // Fetch data regardless of whether searchText is empty or not
        fetch(`http://54.219.143.67:5001/search?category=${selectedOption}&searchTerm=${searchText}`)
            .then(response => response.json())
            .then(data => {
                setResults(data);
            })
            .catch(error => console.error('API error:', error));
    }, [searchText, selectedOption]);

    // Reuse the styles from SearchComponent
    const cardStyle = {
        border: '1px solid #ddd',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        cursor: 'pointer',
        marginLeft:'15%',
        marginRight:'15%',
        marginBottom: '15px',
    };

    const imageStyle = {
        maxWidth: '150px',
        height: 'auto',
        borderRadius: '4px',
        marginRight: '10px',
    };

    const linkStyle = {
        textDecoration: 'none',
        color: 'inherit',     
    };

    return (
        <div className="searchBarResults">
            {/* Map over the results and display each one */}
            {results.map((result, index) => {
                // Extracting only the image name from the path
                const imageName = result.profilePicture.split('/').pop();

                return (
                    <Link 
                        to="/tutor" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        key={index}
                        style={linkStyle}
                    >
                        <div key={index} style={cardStyle}>
                            <img
                                src={`http://localhost:5001/images/${imageName}`}
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
                    </Link>
                );
            })}
        </div>
    );
};

export default SearchResults;
