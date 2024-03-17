import { useEffect, useState, useContext } from "react";
import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { store } from "../App";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

function capitalizeName(name) {
  return name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function Profile() {
  const navigate = useNavigate();
  const [token, setToken] = useContext(store);
  const [data, setData] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedAvatar(url);
    }
  };

  useEffect(() => {
    

    axios
      .get("http://localhost:5000/account", {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [token]); 

  return (
    <div className="main-profile">
     

      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
        </div>
        <div className="profile-content">
          {data ? (
            <div>
              <div className="avatar-container">
                <img
                  src={selectedAvatar || data.avatar}
                  alt="Avatar"
                  className="avatar"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  id="avatar-input"
                  className="hidden"
                />
                <label htmlFor="avatar-input" className="avatar-upload-button">
                  Edit Avatar
                </label>
              </div>
              <p className="profile-info">Name: {capitalizeName(data.name)}</p>
              <p className="profile-info">Email: {data.mail}</p>
              <p className="profile-info">Wins/Bids : 3/7</p>
              <p className="profile-info">Number of posts: 5</p>
            </div>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
      </div>

      <div className="bidscontainer">
        

      </div>
    </div>
  );
}
export default Profile;
