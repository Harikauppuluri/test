import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import { useState, useContext } from "react";
import { store } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import NavbarAfter from "./NavbarAfter";
import NavbarBefore from "./NavbarBefore";

function Navbar() {
  const [token, setToken] = useContext(store);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setToken(null); // Clear the token from context
  };

  return (
    
    <>
    {!token? 
            (
                <NavbarBefore />
            )
      : (
          <NavbarAfter />
      )}
    </>
  );
}

export default Navbar;
