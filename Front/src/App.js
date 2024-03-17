import React from "react";
import "./App.css"; 
import Navbar from "./components/Navbar.js";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import Account from "./pages/Account.js";
import {Routes,Route,BrowserRouter} from 'react-router-dom';
import { useState,createContext,useEffect} from "react";
import Profile from "./components/Profile.js";
import PostAuction from "./components/PostAuction.js";
import NotFound from "./pages/NotFound.js";
import ItemPage from "./components/ItemPage.js";
import { useNavigate } from "react-router-dom";

export const store = createContext();

function App(){
  //const navigate =useNavigate();
  const [token,setToken]=useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, [token]);
  return (
    <store.Provider value={[token,setToken]}>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post-auction" element={<PostAuction />}/>
        <Route path="*" element={<NotFound />} />
        <Route path="/item/:Id" element={<ItemPage />}/>
      </Routes>
    </BrowserRouter>
    </store.Provider>
  );
};

export default App;
