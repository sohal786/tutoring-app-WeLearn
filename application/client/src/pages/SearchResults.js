// SearchResults.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { searchText, selectedOption } = location.state || {};
    //console.log(searchText, selectedOption);
    const backend_api = "http://localhost:5001";
    const [results, setResults] = useState([]);

    useEffect(() => {
        // Fetch data regardless of whether searchText is empty or not
        fetch(`http://localhost:5001/search?category=${selectedOption}&searchTerm=${searchText}`)
            .then(response => response.json())
            .then(data => {
                setResults(data);
                console.log("Fetched results:", data); 
            })
            .catch(error => console.error('API error:', error));
    }, [searchText, selectedOption]);


    const handleTutorSelect = (tutor) => {
        navigate('/tutor', { state: { tutor } });
    };

    const handleVideoClick = (event, videoPath) => {
        event.preventDefault(); // Prevent the default anchor tag behavior
      
        // Construct the full video URL using videoPath
        const fullVideoUrl = videoPath ? `${backend_api}/images/${videoPath.split('/').pop()}` : null;
      
        if (!fullVideoUrl || fullVideoUrl.includes('null') || fullVideoUrl.includes('.jpg')) {
          alert('Video does not exist');
        } else {
          window.open(fullVideoUrl, '_blank', 'noopener,noreferrer');
        }
      };
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
            {results.map((tutor, index) => {
                 console.log("Tutor data being passed:", tutor);
                // Extracting only the image name from the path
                const imageName =  tutor.profilePicture ? tutor.profilePicture.split('/').pop() : null;
                const resume = tutor.resume ? tutor.resume.split('/').pop() : null;
                const video = tutor.video ? tutor.video.split('/').pop() : null;

                return (
                    <div key={index} style={cardStyle} onClick={() => handleTutorSelect(tutor)}>
                    <img
                        src={`http://54.219.143.67:5001/images/${imageName}`}
                        alt="Profile"
                        style={imageStyle}
                    />
                            <div>
                                <h3 style={{ color: '#333' }}>Tutor Name: {tutor.tutorName}</h3>
                                <p style={{ margin: '8px 0', color: '#666' }}>Description: {tutor.description}</p>
                                <p style={{ margin: '8px 0', color: '#666' }}>Topic Name: {tutor.topicName}</p>
                                <p style={{ margin: '8px 0', color: '#666' }}>Resume:
                                 <a href= { `${backend_api}/images/${resume}`} target="_blank" rel="noopener noreferrer">
                                    Click here to view the resume</a></p>
                                    <p style={{ margin: '8px 0', color: '#666' }}>
                                  Video: 
                                  <a href="#" onClick={(e) => handleVideoClick(e, tutor.video)}>
                                  Click here to download the video
                                 </a>
                                  </p>




                            </div>
                        </div>
                   
                );
            })}
        </div>
    );
};

export default SearchResults;