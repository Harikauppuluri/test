import "../App.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Signup(){
    const [users,setFormdata] = useState({
        'name':'',
        'mail':'',
        'password':'',
        'confirmpassword':'',
        'avatar':'/avatar.jpg'
    })
    const navigate=useNavigate();
    const [res, setResponseMessage] = useState('');
    const handlesubmit = (e)=>{
        e.preventDefault();
        console.log(users)
        axios.post('http://localhost:5000/signup',users).then((result)=>{
            console.log(result)
            if(result.status===202){
                setResponseMessage("User Already Exist Please Login");
            }
            else if(result.status===204){
                setResponseMessage("Password doesn't match");
            }
            else{
                setResponseMessage("Sign Up Sucessful");
                alert("Registration Successfull");
                navigate('/login')
            }
        })
        
        
    }


    return(
        <>
        
        <div className="flex-box">
            <div className="card">

            <h2 className="c-h1">Signup</h2>
            <form onSubmit={handlesubmit}  className="c-table">
                <table align="center">
                <tr>
                        {/* <td><label>Name </label></td> */}
                    </tr>
                    <tr>
                    <td><input placeholder="Enter Your Name" className="c-input" type="text" name="name" onChange={(e)=>setFormdata({...users,name:e.target.value})} required /></td>
                    </tr>
                    <tr>
                        {/* <td><label>E-mail </label></td> */}
                    </tr>
                    <tr>
                    <td><input placeholder="Enter Your E-mail" className="c-input" type="email" name="mail" onChange={(e)=>setFormdata({...users,mail:e.target.value})} required /></td>
                    </tr>
                    <tr >
                        {/* <td><label>Password </label></td> */}
                    </tr>
                    <tr>
                    <td><input placeholder="Password" className="c-input" type="password" name="password" onChange={(e)=>setFormdata({...users,password:e.target.value})}  required/></td>
                    </tr>
                    {/* Conform Password */}
                     <tr>
                    <td><input placeholder="Confirm Password" className="c-input" type="password" name="password" onChange={(e)=>setFormdata({...users,confirmpassword:e.target.value})}  required/></td>
                    </tr>
                    <p style={{color:"red"}}>{res}</p>
                    <tr>
                        <button>Signup</button>
                        
                    </tr>
                    <tr className="c-newuser">
                        Already Registred? <Link to="/login">Login</Link>
                    </tr>
                </table>
            </form>

        </div>
        <div className="right-section">
            <img src="bg1.svg" alt="Auction Image" className="auction-img"/>
        </div>
    </div>
    </>
    )
  }
  export default Signup;