import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navlink,
} from 'react-router-dom';
import Home from './components/pages/Home';
import Details from './components/pages/Details';

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/club/:id" element={<Details />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
