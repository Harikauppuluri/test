import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import { useState, useContext } from "react";
import { store } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function NavbarBefore() {
  const [token, setToken] = useContext(store);
  return (
    <nav className="navbar">
      <Link to='/' className="logo-link">
        <h1 className="logo">LIVE <span className="logo-half">AUCTIONS</span></h1>
      </Link>
        <div className="nav-links">
          <Link to='/login' className="nav-link">Login</Link>
          <Link to='/signup' className="button-signup">Sign up<div class="arrow-wrapper">
        <div class="arrow"></div>
    </div></Link>
        </div>
    </nav>
  );
}

export default NavbarBefore;
