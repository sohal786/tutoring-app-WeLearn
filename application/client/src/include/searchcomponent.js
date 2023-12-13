import React, { useState } from "react";
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SearchComponent() {
    const [searchText, setSearchText] = useState('');
    const [selectedOption, setSelectedOption] = useState('All');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
        console.log("Search Text:", e.target.value); // This should log every keystroke in the search input
    };

    const handleSearch = () => {
        console.log("On Search - Text:", searchText, "Option:", selectedOption); 
        navigate('/search-results', { state: { searchText, selectedOption } });
    };


    return (
        <div className="searchBarContainer">
            <div className="justify-content-center">
                <div className="col-md-20">
                    <div className="input-group">
                        <Dropdown className="mr-2">
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
                            onChange={handleInputChange} // Use the handleInputChange function here
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
        </div>
    );
}

export default SearchComponent;
