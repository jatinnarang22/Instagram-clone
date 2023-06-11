const express = require("express");
const router = express.Router();
const Post = require("../model/posts");
const User = require("../model/User");

router.get("/user/:id",(req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
        Post.findById({postedBY:req.params.id})
        .populate("postedBy","_id")
        .then(()=>{
            res.status(200).json({user,post});l
        })
        .catch((err)=>{res.status(422).json({error:err})})
    })
})

module.exports = router;