import React, { useState, useEffect } from "react";
import "../styles/Posts.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Posts() {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("cookie");

    if(!token){
      navigate("../signin");
    }
  }, [])

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    // saving post to mongodb
    if (url) {
      fetch("http://localhost:5000/createPost", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("cookie"),
        },
        body: JSON.stringify({
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            notifyA(data.error);
          } else {
            notifyB("Successfully Posted");
            navigate("/")
          }
        })
        .catch((err) => console.log(err));
    }
  }, [url]);

  // posting image to cloudinary
  const postDetails = () => {
    console.log(body, image);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "cantacloud2");
    fetch("https://api.cloudinary.com/v1_1/cantacloud2/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
    console.log(url);
  };

  const loadfile = (event) => {
    var output = document.getElementById("output");
    // console.log(event.target.files[0]);
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };
  return (
    
    <div className="create-posts">
      {/* header */}
      <div className="post-header">
        <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
        <button id="post-btn" onClick={() => { postDetails() }}>Share</button>
      </div>
      {/* image preview */}
      <div className="main-div">
        <img
          id="output"
          src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png"
        />
         <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadfile(event);
            setImage(event.target.files[0])
          }}
        ></input>
      </div>
      {/* details */}
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img
              src="https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
              alt=""
            />
          </div>
          <h5>Jatin Narang</h5>
        </div>
        <textarea value={body} style={{color:" #d5FF40"}} onChange={(e) => {
          setBody(e.target.value)
        }} type="text" placeholder="Write a caption...."></textarea>
      </div>
    </div>
  );
}
