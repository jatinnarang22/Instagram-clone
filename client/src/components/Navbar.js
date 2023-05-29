import React ,{useContext, useState, useEffect} from "react";
import "../styles/navbar.css";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import {LoginContext} from "./App"
export default function Navbar({login,setModalOpen}) {
  const [token, setToken] = useState(null);

    useEffect(() => {
      setToken(localStorage.getItem("cookie"));
    }, [])
  const loginStatus=()=>{
    // const setModalOpen;
    // const { setModalOpen } = useContext(LoginContext);
    // const token = localStorage.getItem("cookie");
    console.log(token);
    console.log(login);
    if(token || login){
      return [
        <>
         <Link rel="stylesheet" to="/profile">
          <li>Profile</li>
        </Link>
        <Link rel="stylesheet" to="/createpost">
          <li>CreatePosts</li>
        </Link>
        <Link rel="stylesheet" to="">
          <button className="primarybtn" onClick={() =>  setModalOpen(true)}>Log Out</button>
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
