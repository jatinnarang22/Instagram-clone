import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {
  const navigate = useNavigate();
  const [Data, setData] = useState([]);
  const [comment, setcomment] = useState("");
  const [show, setshow] = useState(false);
  const [item, setitem] = useState([]);
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  useEffect(() => {
    const token = localStorage.getItem("cookie");

    if (!token) {
      navigate("./signin");
    }

    //Fetching all posts
    fetch("http://localhost:5000/allPosts", {
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
  }, []);

  // to show and hide comments
  const toggleComment = (posts) => {
    if (show) {
      setshow(false);
    } else {
      console.log(posts);   
      setitem(posts);
      setshow(true);
    }
  };

  const likePost = (id) => {
    fetch("http://localhost:5000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("cookie"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newdata = Data.map((posts) => {
          console.log(result._id);
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        // console.log(newdata);
        setData(newdata);
        // console.log(result)
      });
  };

  const unlikePost = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("cookie"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newdata = Data.map((posts) => {
          if (posts._id == result._id) {
            console.log(result);
            return result;
          } else {
            return posts;
          }
        });
        setData(newdata);
        // console.log(result)/////
      });
  };

  const makecomment = (text, id) => {
    fetch("http://localhost:5000/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("cookie"),
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newdata = Data.map((posts) => {
          console.log(result._id);
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        // console.log(newdata);
        setData(newdata);
        setcomment("");
        notifyB("Comment posted");
        console.log(result);
      });
  };

  return (
    // card

    <div className="body">
      {Data.map((posts) => {
        return (
          <div className="card">
            <div className="card-header">
              <img
                src="https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                alt=""
              />
              <h5>
                <Link to={`/profile/${posts.postedBy._id}`}>
                  {posts.postedBy.name}
                </Link>
              </h5>
            </div>
            <div className="card-body">
              <img src={posts.photo} alt="" />
            </div>
            <div className="card-footer">
              {posts.likes.includes(
                JSON.parse(localStorage.getItem("user")).userid
              ) ? (
                <span
                  className="material-symbols-outlined material-symbols-outlined-red"
                  onClick={() => {
                    unlikePost(posts._id);
                  }}
                >
                  favorite
                </span>
              ) : (
                <span
                  className="material-symbols-outlined"
                  onClick={() => {
                    likePost(posts._id);
                  }}
                >
                  favorite
                </span>
              )}
              <p>{posts.likes.length} likes</p>
              <p>{posts.body}</p>
              <h5
                style={{ fontSize: "bold", cursor: "pointer" }}
                onClick={() => {
                  toggleComment(posts);
                }}
              >
                View all comments
              </h5>
            </div>

            <div className="card-comment">
              <span className="material-symbols-outlined">
                sentiment_satisfied
              </span>
              <input
                type="text"
                style={{ background: "#292525", color: "#d5FF40" }}
                placeholder="Add a Comment"
                value={comment}
                onChange={(e) => {
                  setcomment(e.target.value);
                }}
              />
              <button
                className="comment"
                onClick={() => {
                  makecomment(comment, posts._id);
                }}
              >
                Post
              </button>
            </div>
          </div>
        );
      })}
      {/* ----show all comment's start----- */}
      {show && (
        <div className="show-comment">
          <div className="container">
            <div className="pic-container">
              {/* <img src={posts.photo} alt="" />  */}
              <img src={item.photo} alt="" />
            </div>
            <div className="detail">
              <div
                className="card-header"
                style={{ borderBottom: "1px solid rgb(148 165 86) " }}
              >
                <div className="card-pic">
                  <img
                    src="https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                    alt=""
                  />
                </div>
                <h5>{item.postedBy.name}</h5>
                {/* {console.log(item)} */}
              </div>
              <div className="allcomment">
                {item.comments.map((comment) => {
                  return (
                    
                    <p className="comm" style={{ color: "#d5FF40" }}>
                      {console.log(item.comments)}
                      <span className="commenter" style={{fontWeight:"bolder"}}>{comment.postedBy.name}{" "}</span>
                      <span className="commentText">{comment.comment}</span>
                    </p>
                  );
                })}
              </div>
              <div
                className="card-footer"
                style={{
                  borderTop: "1px solid rgb(148 165 86)",
                  borderTop: "1px solid rgb(148 165 86) ",
                }}
              >
                <p>{item.likes.length} likes</p>
                <p>{item.body}</p>
              </div>
              {/* ----START adding comment --- */}
              <div className="card-comment">
                <span className="material-symbols-outlined">
                  sentiment_satisfied
                </span>
                <input
                  type="text"
                  style={{ background: "#292525", color: "#d5FF40" }}
                  placeholder="Add a Comment"
                  value={comment}
                  onChange={(e) => {
                    setcomment(e.target.value);
                  }}
                />
              </div>
              {/* ---END addcomment--- */}
            </div>
          </div>
          <div className="close-comment">
            <span
              className="material-symbols-outlined material-symbols-outlined-comment"
              onClick={() => {
                toggleComment();
              }}
            >
              close
            </span>
          </div>
        </div>
      )}
      {/* -----show comment's end----- */}
    </div>
  );
}
