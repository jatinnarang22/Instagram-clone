const express = require("express");
const router = express.Router();
const Post = require("../model/posts");
const User = require("../model/User");

// to get user profile
router.get("/user/:id", (req, res) => {
    User.findOne({ _id: req.params.id })
      .select("-password")
      .then((user) => {
        console.log(user._id);
        Post.find({ postedBy: user._id })
          .then((posts) => {
            res.status(200).json({ user, posts });
          })
          .catch((err) => {
            res.status(404).json(err);
          });
      });
  });

  
module.exports = router;
