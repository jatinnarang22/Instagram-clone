const express = require("express");
const router = express.Router();
const Post = require("../model/posts");
const User = require("../model/User");

router.get("/allPosts", (req, res) => {
  Post.find().populate("postedBy","_id name")
    .then((posts) => res.json(posts))
    .catch((err) => console.log(err));
});

router.post("/createPost", async (req, res) => {
  const { body, pic } = req.body;
  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization) {
    return res.status(401).json({ error: "You must have logged in 1" });
  }
  const cookies = authorization.replace("Bearer ", "");

  console.log(cookies);
  const auth = await User.findById(cookies);
  console.log(auth);
  if (!auth) return res.status(401).json({ error: "You have to logged first" });
  // if(cookie != user._id)return res.status(401).json({ error: "You have to logged first" });
  console.log(pic);

  if (!body || !pic)
    return res.status(422).json({ error: "Please add all the field " });

  // console.log(req.user);

  const post = new Post({
    body,
    photo: pic,
    postedBy:cookies,
    // postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      return res.json({ post: result });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
