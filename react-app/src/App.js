import React, { useState } from 'react';
import './App.css';
import Home from './components/pages/Home';

const pages = {
  home: {
    name: 'Home',
    component: Home,
  },
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const CurrentComponent = pages[currentPage].component;

  return (
    <>
      <div className="app-content">
        <CurrentComponent name={pages[currentPage].name} />
      </div>
    </>
  );
}

export default App;
