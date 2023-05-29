import React, { useState } from "react";
import logo from "../img/logo.png";
import "../styles/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function SignUp() {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");

  //Toast Functions
  const notifyA = (msg) => {
    toast.error(msg);
  };
  const notifysuccess = (msg) => {
    toast.success(msg);
  };
  const emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordregex =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const postData = () => {
    //checking email
    if (!emailregex.test(email)) {
      notifyA("Invalid email");
      return;
    }else if(!passwordregex.test(password)){
      notifyA("Minimum eight characters, at least one letter and one number");
      
      return;
    }
    //sending to the server
    fetch("http://localhost:5000/create", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        username: userName,
        email: email,
        password: password,
        Confirm_password: confirm_password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) notifyA(data.error);
        else {
          notifysuccess(data.success);
          navigate("/SignIn");
        }
        console.log(data);
      });
  };

  return (
    <div className="signup">
      <div className="form-container">
        <div className="form">
          <img className="signUplogo" src={logo} alt="" />
          <p className="loginPara">
            Sign up to see photos and videos
            <br /> from your friend
          </p>
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
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
              placeholder="Full Name"
            />
          </div>
          <div>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={userName}
              onChange={(e) => {
                setuserName(e.target.value);
              }}
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
          <div>
            <input
              type="confirmpassword"
              name="confirmpassword"
              id="confirmpassword"
              placeholder="Confirm Password"
              value={confirm_password}
              onChange={(e) => {
                setconfirm_password(e.target.value);
              }}
            />
          </div>
          <p
            className="loginPara"
            style={{ fontSize: "12px", margin: "3px 0px" }}
          >
            By signin up , you agree to our Terms,
            <br /> privacy Policy and cookies policy.
          </p>
          <input
            type="submit"
            id="submit-btn"
            onClick={() => {
              postData();
            }}
            value="Sign Up"
          />
          <hr
            style={{
              width: "90%",
              margin: "15px auto",
              border: "1px solid rgb(213, 255, 64)",
              opacity: "0.8",
            }}
          />
          <div className="form2">
            Already have an account?{" "}
            <Link to="/signin">
              <span style={{ color: "blue", cursor: "pointer" }}>Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
