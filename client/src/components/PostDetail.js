import React from "react";
import "../styles/PostDetail.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function PostDetail({ item, toggleDetails }) {
  const navigate = useNavigate();

  // Toast functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const removePost = (postId) => {
    console.log(postId);
    if (window.confirm("Do you really want to delete this post ?")) {
      fetch(`http://localhost:5000/deletePost/${postId}`, {
        method: "delete",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("cookie"),
        },
      })
        .then((res) => {
          res.json();
        })
        .then((result) => {
          console.log(result);
          toggleDetails();
          navigate("/");
          notifyB("successfully deleted");
        });
    }
  };
  return (
    <>
      {/* ----show all comment's start----- */}
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "89%",
                }}
              >
                <h5>{item.postedBy.name}</h5>
                <span
                  className="material-symbols-outlined"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    removePost(item._id);
                  }}
                >
                  delete
                </span>
              </div>
            </div>
            <div className="allcomment">
              {item.comments.map((comment) => {
                return (
                  <p className="comm" style={{ color: "#d5FF40" }}>
                    <span
                      className="commenter"
                      style={{ fontWeight: "bolder" }}
                    >
                      {comment.postedBy.name}{" "}
                    </span>
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
            {/* <div className="card-comment"  >
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
                }}/>
                </div> */}
            {/* ---END addcomment--- */}
          </div>
        </div>
        <div className="close-comment">
          <span
            className="material-symbols-outlined material-symbols-outlined-comment"
            onClick={() => {
              toggleDetails();
            }}
          >
            close
          </span>
        </div>
      </div>
      {/* -----show comment's end----- */}
    </>
  );
}
