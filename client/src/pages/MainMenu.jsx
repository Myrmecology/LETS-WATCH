import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Bubbles from '../components/Bubbles/Bubbles';
import '../styles/MainMenu.css';

const MainMenu = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="main-menu-page">
      <Bubbles />
      <div className="main-menu-content">
        <h1 className="main-menu-logo">
          <span className="logo-circle"></span>LETS
          <br />
          <span className="logo-circle large"></span> WATCH
        </h1>

        <nav className="main-menu-nav">
          <Link to="/movies" className="main-menu-link">
            MOVIES
          </Link>
          <Link to="/tv-shows" className="main-menu-link">
            TV SHOWS
          </Link>
          <Link to="/search" className="main-menu-link">
            SEARCH
          </Link>
        </nav>

        <div className="main-menu-featured">
          <span className="main-menu-circle"></span>
          <span className="main-menu-featured-text">POPCORN</span>
        </div>

        <div className="main-menu-auth">
          {isAuthenticated ? (
            <>
              <span className="main-menu-welcome">Welcome, {user?.username}!</span>
              <Link to="/favorites" className="main-menu-auth-link">
                MY FAVORITES
              </Link>
              <Link to="/menu" className="main-menu-auth-link">
                CONTINUE BROWSING
              </Link>
            </>
          ) : (
            <>
              <Link to="/signup" className="main-menu-auth-link signup">
                SIGN UP
              </Link>
              <Link to="/login" className="main-menu-auth-link login">
                LOG IN
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="diagonal-line"></div>
    </div>
  );
};

export default MainMenu;