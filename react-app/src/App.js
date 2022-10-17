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
import NotFound from './components/pages/NotFound';
import NavBar from './components/NavBar';
import Add from './components/pages/Add';

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="club/:id" element={<Details />}></Route>
          <Route path="/add" element={<Add />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
