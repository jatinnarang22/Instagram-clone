import React,{useEffect,useState} from "react";
import "../styles/Home.css"
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate =useNavigate();
  const  [Data, setData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("cookie");

    if(!token){
      navigate("./signin");
    }

    //Fetching all posts
    fetch("http://localhost:5000/allPosts",{
      headers: {
        Authorization: "Bearer " + localStorage.getItem("cookie"),
      },
    })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      setData(result);
    })
    .catch((err) => console.log(err));

  }, [])
  
  return (
    // card
    <div className="body">
      {Data.map((posts)=>{
        return(
          <div className="card">
          <div className="card-header">
        <img
          src="https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
          alt=""
        />
        <h5>{posts.postedBy.name}</h5>
      </div>
      <div className="card-body">
        <img
          src={posts.photo}
          alt=""
        />
      </div>
      <div className="card-footer">
        <span className="material-symbols-outlined">favorite</span>
        <p>1 Like</p>
        <p>{posts.body}</p>
      </div>
      <div className="card-comment">
        <span className="material-symbols-outlined">sentiment_satisfied</span>
        <input type="text" style={{background:"#292525",color:"#d5FF40"}} placeholder="Add a Comment" />
        <button className="comment">Post</button>
      </div>
      </div>
        )
      })}
      
      
    </div>
    
  );
}
