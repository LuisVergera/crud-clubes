import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import premierLogo from './premier-league-logo.png';

const NavBar = () => {
  return (
    <>
      <div className="max-w-36">
        <NavLink to="/">
          <img className="max-h-36 max-w-36" alt="logo" src={premierLogo} />
        </NavLink>
        <h1>Crud Clubes</h1>
      </div>
    </>
  );
};
export default NavBar;
