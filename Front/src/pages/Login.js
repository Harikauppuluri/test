import "./Login.css";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { store } from "../App";
import Navbar from "../components/Navbar";

function Login() {
  const [token, setToken] = useContext(store);
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Check if there's a token in localStorage on component load


  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/login", formData)
      .then((res) => {
        if (res.data.token) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token); // Store the token in localStorage
          navigate("/account");
        } else {
          setError("Invalid email or password");
        }
      })
      .catch((error) => {
        console.error("Login error: ", error);
        setError("Internal server error");
      });
  };

  return (
    <>
     
      <div className="flex-box">
        <div className="card">
          <h2 className="c-h1">Login</h2>
          <form onSubmit={handleSubmit} className="c-table">
            <table align="center">
              <tr>
                <td>
                  <input
                    placeholder="Enter Your E-mail"
                    className="c-input"
                    type="email"
                    name="mail"
                    value={formData.mail}
                    onChange={(e) =>
                      setFormData({ ...formData, mail: e.target.value })
                    }
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    placeholder="Enter Your Password"
                    className="c-input"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <button className="button-55">Login</button>
                </td>
              </tr>
              <tr className="c-newuser">
                New User? <Link to="/Signup">Signup</Link>
              </tr>
            </table>
          </form>
        </div>
        <div className="right-section">
          <img
            src="bg1.svg"
            alt="Auction Illustration"
            className="auction-img"
          />
        </div>
      </div>
    </>
  );
}

export default Login;
