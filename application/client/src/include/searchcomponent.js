// import React, { Component, useState } from "react";

// function SearchComponent() {
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [showDropdown, setShowDropdown] = useState(false);
//     const [results, setResults] = useState([]);
  
//     // Handle category selection
//     const handleCategorySelect = (category) => {
//       setSelectedCategory(category);
//       setShowDropdown(false);
//     };
  
//     // Handle search term change
//     const handleSearchTermChange = (e) => {
//       setSearchTerm(e.target.value);
//     };
  
//     // Perform search based on selected category and search term
//     const handleSearch = () => {
//       fetch(`http://54.219.143.67:5001/search?category=${selectedCategory}&searchTerm=${searchTerm}`)
//         .then((response) => response.json())
//         .then((data) => {
//           setResults(data); // Update the state with search results
//         })
//         .catch((error) => {
//           console.error('API error:', error);
//         });
//     };
  
//     // Handle key press (Enter) to trigger search
//     const handleKeyPress = (e) => {
//       if (e.key === 'Enter') {
//         handleSearch();
//       }
//     };
  
//     const categories = ['Math', 'CSC', 'Physics'];
  
//     // Styling for each search result card
//     const cardStyle = {
//       border: '1px solid #ddd',
//       padding: '10px',
//       borderRadius: '8px',
//       boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
//       display: 'flex',
//       flexDirection: 'row', // Changed to row to place the image on the left
//       alignItems: 'center',
//       cursor: 'pointer',
//       width: '100%', // Occupies full width
//       marginBottom: '15px', // Separation between cards
//     };
  
//     // Styling for the profile picture in each card
//     const imageStyle = {
//       maxWidth: '150px', // Adjust the width of the image
//       height: 'auto',
//       borderRadius: '4px',
//       marginRight: '10px', // Aligns the image to the left
//     };
  
//     return (
//       <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//         <h1 style={{ textAlign: 'center', color: '#333' }}>Tutor Search</h1>
//         <button
//           style={{
//             backgroundColor: '#4caf50',
//             color: 'white',
//             padding: '10px 15px',
//             marginTop: '10px',
//             cursor: 'pointer',
//           }}
//           onClick={() => setShowDropdown(!showDropdown)}
//         >
//           Select Category
//         </button>
//         {showDropdown && (
//           <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
//             {categories.map((category) => (
//               <button key={category} onClick={() => handleCategorySelect(category)}>
//                 {category}
//               </button>
//             ))}
//           </div>
//         )}
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={handleSearchTermChange}
//           onKeyPress={handleKeyPress}
//           style={{ width: '100%', padding: '10px', marginTop: '10px', boxSizing: 'border-box' }}
//         />
//         <button
//           style={{ backgroundColor: '#4caf50', color: 'white', padding: '10px 15px', marginTop: '10px', cursor: 'pointer' }}
//           onClick={handleSearch}
//         >
//           Search
//         </button>
//         <p>Selected Category: {selectedCategory}</p>
//         <p>Search Term: {searchTerm}</p>
  
//         <div style={{ marginTop: '20px' }}>
//           {results.map((result, index) => (
//             <div key={index} style={cardStyle}>
//               <img
//                 src={result.profilePicture}
//                 alt="Profile"
//                 style={imageStyle}
//               />
//               <div>
//                 <h3 style={{ color: '#333' }}>Tutor Name: {result.tutorName}</h3>
//                 <p style={{ margin: '8px 0', color: '#666' }}>Description: {result.description}</p>
//                 <p style={{ margin: '8px 0', color: '#666' }}>Topic Name: {result.topicName}</p>
//                 <p style={{ margin: '8px 0', color: '#666' }}>Resume: {result.resume}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }
  
//   export default SearchComponent;
  

import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown'; // Ensure you have this import

function SearchComponent() {
    const [searchText, setSearchText] = useState('');
    const [selectedOption, setSelectedOption] = useState('All');
    const [showDropdown, setShowDropdown] = useState(false);
    const [results, setResults] = useState([]);

    // Perform search based on selected category and search term
    const handleSearch = () => {
        // Update the fetch URL with your search logic
        fetch(`http://54.219.143.67:5001/search?category=${selectedOption}&searchTerm=${searchText}`)
        .then((response) => response.json())
        .then((data) => {
            setResults(data); // Update the state with search results
        })
        .catch((error) => {
            console.error('API error:', error);
        });
    };

    // Styling for each search result card
    const cardStyle = {
              border: '1px solid #ddd',
              padding: '10px',
              borderRadius: '8px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'row', // Changed to row to place the image on the left
              alignItems: 'center',
              cursor: 'pointer',
              width: '100%', // Occupies full width
              marginBottom: '15px', // Separation between cards
            };
          
            // Styling for the profile picture in each card
            const imageStyle = {
              maxWidth: '150px', // Adjust the width of the image
              height: 'auto',
              borderRadius: '4px',
              marginRight: '10px', // Aligns the image to the left
            };

    return (
        <div style={{ marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>
            <div className="d-flex justify-content-center">
                <div className="col-md-6">
                    <div className="input-group">
                        <Dropdown show={showDropdown} onToggle={(isOpen) => setShowDropdown(isOpen)}>
                            <Dropdown.Toggle variant="outline-secondary">
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
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={handleSearch}
                            >
                                🔍
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '20px' }}>
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
