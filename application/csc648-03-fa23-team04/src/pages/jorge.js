import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Dropdown from 'react-bootstrap/Dropdown';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedOption, setSelectedOption] = useState('All');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = () => {
    console.log("Search for:", searchText, "Option:", selectedOption);
    // Implement the search or data filtering logic here
  };

  return (
    <div className="d-flex justify-content-center" style={{ marginTop: '-80px' }}>
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
  );
}

export default SearchBar;
