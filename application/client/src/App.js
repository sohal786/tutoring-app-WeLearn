import React, { Component, useState } from "react";
import "./css/global.css";
//import  { useState } from 'react';
//import NavigationBar from "./include/navigation";

//import HomePage from "./pages/Home";
//import AboutPage from "./pages/About";
//import NotFound from "./include/NotFound";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

//React Router
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Akshat from "./pages/akshat";
//import Aakanksha from "./pages/aakanksha";
//import Andy from "./pages/andy";
//import Jorge from "./pages/jorge";
//import Azi from "./pages/azi";
//import Charter from "./pages/charter";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  // callIndex() {
  //   fetch("http://localhost:9000/")
  //     .then(res => res.text())
  //     .then(res => this.setState({ index: res }))
  //     .catch(err => err);
  // }

  // callAPI() {
  //   fetch("http://localhost:9000/testAPI")
  //     .then(res => res.text())
  //     .then(res => this.setState({ apiResponse: res }))
  //     .catch(err => err);
  // }
  

   callHome(){
     fetch("http://54.219.143.67:5001/topic")
     .then(res => res.text())
     .then(res => this.setState({ home: res}))
     .catch(err=>err);
   }

  //  callData(){
  //   fetch("http://localhost:5000/")
  //    .then(res => res.text())
  //    .then(res => this.setState({ data: res}))
  //    .catch(err=>err);
  //  }

  // // <p className="App-intro">{this.state.home}</p>
  // //       <p className="App-intro">{this.state.apiResponse}</p>
  
   componentWillMount() {
   //  this.callAPI();
     this.callHome();
  //   this.callIndex();
  // this.callData();
   }

   

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
          <h1 className="App-title">This is the test!</h1>
        </header>
          <br></br>
          <body>
          <SearchComponent /> {/* Add the SearchComponent here */}

            
          </body>
        {/* <input type="search" class="search" placeholder = "e.g. Math 111"></input> */}
          
        <p className="App-intro">{this.state.home}</p>
        
      </div>
    );
  }
}

// function SearchComponent() {
//   // State to store the selected category
//   const [selectedCategory, setSelectedCategory] = useState('');
//   // State to store the search term
//   const [searchTerm, setSearchTerm] = useState('');
//   // State to control the visibility of the dropdown
//   const [showDropdown, setShowDropdown] = useState(false);

//   // Handler for selecting a category
//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     setShowDropdown(false); // Close the dropdown after selecting a category
//   };

//   // Handler for updating the search term
//   const handleSearchTermChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Handler for the search button click
//   // Handler for the search button click
// const handleSearch = () => {
//   console.log('Selected Category:', selectedCategory);
//   console.log('Search Term:', searchTerm);

//   // Make an API request to your Express server
//   fetch(`http://localhost:5001/search?category=${selectedCategory}&searchTerm=${searchTerm}`)
  
//     .then((response) => response.json())
//     .then((data) => {
//       // Handle the response data here
//       console.log('Search results:', data);
//     })
//     .catch((error) => {
//       console.error('API error:', error);
//     });
// };

  

//   // Handler for Enter key press in the search input
//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   // Categories to display in the dropdown
//   const categories = ['Math', 'CSC', 'Physics'];

//   return (
//     <div className="SearchComponent">
//       <h1>Tutor Search</h1>
//       <button onClick={() => setShowDropdown(!showDropdown)}>Select Category</button>
//       {showDropdown && (
//         <div className="dropdown">
//           {categories.map((category) => (
//             <button key={category} onClick={() => handleCategorySelect(category)}>
//               {category}
//             </button>
//           ))}
//         </div>
//       )}
//       <input
//         type="text"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={handleSearchTermChange}
//         onKeyPress={handleKeyPress}
//       />
//       <button onClick={handleSearch}>Search</button>
//       <p>Selected Category: {selectedCategory}</p>
//       <p>Search Term: {searchTerm}</p>
//     </div>
//   );
// }
function SearchComponent() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [results, setResults] = useState([]);

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowDropdown(false);
  };

  // Handle search term change
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Perform search based on selected category and search term
  const handleSearch = () => {
    fetch(`http://54.219.143.67:5001/search?category=${selectedCategory}&searchTerm=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setResults(data); // Update the state with search results
      })
      .catch((error) => {
        console.error('API error:', error);
      });
  };

  // Handle key press (Enter) to trigger search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const categories = ['Math', 'CSC', 'Physics'];

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
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Tutor Search</h1>
      <button
        style={{
          backgroundColor: '#4caf50',
          color: 'white',
          padding: '10px 15px',
          marginTop: '10px',
          cursor: 'pointer',
        }}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        Select Category
      </button>
      {showDropdown && (
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
          {categories.map((category) => (
            <button key={category} onClick={() => handleCategorySelect(category)}>
              {category}
            </button>
          ))}
        </div>
      )}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchTermChange}
        onKeyPress={handleKeyPress}
        style={{ width: '100%', padding: '10px', marginTop: '10px', boxSizing: 'border-box' }}
      />
      <button
        style={{ backgroundColor: '#4caf50', color: 'white', padding: '10px 15px', marginTop: '10px', cursor: 'pointer' }}
        onClick={handleSearch}
      >
        Search
      </button>
      <p>Selected Category: {selectedCategory}</p>
      <p>Search Term: {searchTerm}</p>

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



// <Router>
      //   <div className="App">
      //     <NavigationBar />
      //     <div className="content">
      //       <Routes>
      //         <Route exact path="/" element={<HomePage />} />
      //         <Route path="/about" element={<AboutPage />} />
      //         <Route path="*" element={<NotFound />} />
      //         <Route path="akshat" element={<Akshat />} />
      //         <Route path="aakanksha" element={<Aakanksha />} />
      //         <Route path="andy" element={<Andy />} />
      //         <Route path="jorge" element={<Jorge />} />
      //         <Route path="azi" element={<Azi />} />
      //         <Route path="charter" element={<Charter />} />
      //       </Routes>
      //     </div>
      //   </div>
      // </Router>