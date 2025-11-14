import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/menu');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/menu" className="navbar-logo">
          LETS WATCH
        </Link>

        <ul className="navbar-menu">
          <li>
            <Link to="/movies" className={`navbar-link ${isActive('/movies')}`}>
              MOVIES
            </Link>
          </li>
          <li>
            <Link to="/tv-shows" className={`navbar-link ${isActive('/tv-shows')}`}>
              TV SHOWS
            </Link>
          </li>
          <li>
            <Link to="/search" className={`navbar-link ${isActive('/search')}`}>
              SEARCH
            </Link>
          </li>
          <li>
            <Link to="/favorites" className={`navbar-link ${isActive('/favorites')}`}>
              FAVORITES
            </Link>
          </li>
        </ul>

        <div className="navbar-user">
          {user && (
            <>
              <span className="navbar-username">Hello, {user.username}</span>
              <button onClick={handleLogout} className="navbar-logout-btn">
                LOG OUT
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;