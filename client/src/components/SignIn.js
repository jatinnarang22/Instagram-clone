import React, { useState , useContext  } from "react";
import "../styles/SignIn.css";
import logo from "../img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {LoginContext} from "./App"


export default function SignIn() {
  const {setisauth} = useContext(LoginContext)
  const navigate=useNavigate();
  const errtoast=(msg)=>{
    toast.error(msg);
  }
  const successtoast=(msg)=>{
    toast.success(msg);
  }
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const postData = () => {
    console.log({email, password});
    fetch("http://localhost:5000/create-session", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("cookie"),
      },
      body: JSON.stringify({
        email:email,
        password:password
      })
    }).then((res)=>res.json())
    .then((data)=>{
      if (data.error){
        errtoast(data.error);
        navigate("/signup");
      }
        else {
          successtoast("Signed In Successfully")
          console.log(data,"show ");
          localStorage.setItem("cookie", data.localstore);
          localStorage.setItem("user", JSON.stringify( data.user));
          setisauth(true)
          navigate("/");
        }
      console.log(data);
    })
  };
  return (
    <div className="signin">
      <div>
        <div className="loginForm">
          <img className="signInLogo" src={logo} alt="" />
          <div>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
          </div>

          <input
            type="submit"
            id="login-btn"
            // onClick={() => {
            //   postdata;
            // }}
            onClick={() => {
              postData();
            }}
            value="Sign In"
          />
          <hr
            style={{
              width: "90%",
              margin: "25px auto",
              border: "1px solid rgb(213, 255, 64)",
              opacity: "0.8",
            }}
          />
          <div className="loginForm2">
            Don't have an account?{" "}
            <Link to="/signUp">
              <span style={{ color: "blue", cursor: "pointer" }}>Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
