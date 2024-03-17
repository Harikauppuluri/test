import React from "react";
import './Login.css'
import { useNavigate} from "react-router-dom";
import { useEffect } from "react";
function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate("/");
    }, 4000);
    return () => clearTimeout(redirectTimer);
  }, [navigate]);
  return (
    <div className="div-404">
      <img src="oops.svg" className="oops-img" /> 
      
    </div>
  );
}

export default NotFound;