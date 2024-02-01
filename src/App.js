import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowList from './components/Shows';
import ShowDetails from './components/Details';
import BookTicket from './components/BookTicket';
import { Navbar, Nav } from 'react-bootstrap';

const API_URL = 'https://api.tvmaze.com/search/shows?q=all';

function App() {
  const [shows, setShows] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setShows(data))
      .catch((error) => console.error('Error fetching shows:', error));

    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      const userDetails = JSON.parse(storedUserDetails);
      const userName = userDetails.name;
      setUserName(userName);
    }

  }, []);

  return (
    <div>
      <div>
        <Navbar bg="light" variant="light">
          <Navbar.Brand >
            TV Shows
          </Navbar.Brand>
          <Nav className="ml-auto">
            Hello, {userName ? userName : 'user'}
          </Nav>
        </Navbar>
      </div>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<ShowList shows={shows} />} />
            <Route path="/show/:id" element={<ShowDetails />} />
            <Route path='/book/:id' element={<BookTicket />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
