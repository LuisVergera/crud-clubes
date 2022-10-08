import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

const NavBar = () => {
  return (
    <>
      <div>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? 'active' : 'not-active')}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? 'active' : 'not-active')}
              to="club/57"
            >
              Prueba
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};
export default NavBar;
