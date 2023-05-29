import React ,{useContext} from "react";
import "../styles/navbar.css";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import {LoginContext} from "./App"
export default function Navbar({login}) {
  const loginStatus=()=>{
    const token = localStorage.getItem("cookie");
    if(token || login){
      return [
        <>
         <Link rel="stylesheet" to="/profile">
          <li>Profile</li>
        </Link>
        <Link rel="stylesheet" to="/createpost">
          <li>CreatePosts</li>
        </Link>
        </>
      ]
    }
    else{
      return [
        <>
        <Link rel="stylesheet" to="/signup">
          <li>SignUp</li>
        </Link>
        <Link rel="stylesheet" to="/signin">
          <li>SignIn</li>
        </Link>
        </>
      ]
    }
  };
  // loginStatus();
  return (
    <div className="navbar">
      <img src={logo} alt="" />
       <ul className="nav-menu">
        {loginStatus()}
      </ul> 
    </div>
  );
}
