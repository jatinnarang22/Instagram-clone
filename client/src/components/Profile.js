import React from "react";
import "../styles/Profile.css";
export default function Profile() {
  return (
    <div className="Profile">
      <div className="profile-frame">
        <div className="profile-pic">
          <img
            src="https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
            alt=""
          />
        </div>
        <div className="profile-data">
          <h1>UserName</h1>
          <div className="profile-info">
            <h3>4 Posts</h3>
            <h3>4 Followers</h3>
            <h3>4 Folowing</h3>
          </div>
        </div>
      </div>
      <hr style={{ width: "90%", margin: "auto", border:"1px solid #D5FF40",opacity: "0.8", margin:"25px auto"}} />
      {/* gallery */}
      <div className="gallery">
        <img
          src="https://images.unsplash.com/photo-1519417688547-61e5d5338ab0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9zdHN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
          alt=""
        />
        <img
          src="https://images.unsplash.com/photo-1528459199957-0ff28496a7f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGFnZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
          alt=""
        />
        <img
          src="https://images.unsplash.com/photo-1588001832198-c15cff59b078?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c3Vuc2V0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
          alt=""
        />
      </div>
    </div>
  );
}
