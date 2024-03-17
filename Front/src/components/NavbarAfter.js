import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import { useState, useContext } from "react";
import { store } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function NavbarAfter() {
  const [token, setToken] = useContext(store);
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setToken(null); 
  };

  return (
    <nav className="navbar">
      <Link to= '/account' className="logo-link">
        <h1 className="logo">LIVE <span className="logo-half">AUCTIONS</span></h1>
      </Link>
        <div className="nav-links">
          <Link to='/post-auction' className="nav-link">How-To-BID</Link>
          <Link to='/profile' className="nav-link">My Profile</Link>
          <Link to='/auctions' className="nav-link">My Auctions</Link>
          <Link to='/login' className="nav-link" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </Link>
        </div>
    </nav>
  );
}

export default NavbarAfter;
