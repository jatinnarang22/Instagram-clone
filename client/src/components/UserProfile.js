import React,{useState,useEffect} from "react";
import "../styles/Profile.css";
import {useParams } from "react-router-dom";
// import PostDetail from "./UserPostDetail";
export default function UserProfile() {

    const {userid} = useParams();
    console.log(userid); 
  const [user, setuser] = useState("")
  const [post, setpost] = useState([]);


  useEffect(() => {
    fetch(`http://localhost:5000/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("cookie"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setuser(result.user);
        setpost(result.posts);
  })
}, [])
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
          <h1>{user.name}</h1>
          <div className="profile-info">
            <h3>{post.length} Posts</h3>
            <h3>4 Followers</h3>
            <h3>4 Folowing</h3>
          </div>
        </div>
      </div>
      <hr style={{ width: "90%", margin: "auto", border:"1px solid #D5FF40",opacity: "0.8", margin:"25px auto"}} />
      {/* gallery */}
      <div className="gallery">
        {post.map((post)=>{
          return <img key={post._id} src={post.photo} className="items" onClick={()=>{
            // toggleDetails(pic);           
          }}></img>
        })}
      </div>
      {/* {show && 
      <PostDetail item={post} toggleDetails={toggleDetails}></PostDetail>
      } */}
      
    </div>
  );
    }