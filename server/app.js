const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const cors= require("cors");
const app = express();
const port = 5000;
const cookieParser = require("cookie-parser");
const User=require('./model/User');
const Post=require("./model/posts")

const auth = require("./routes/auth");
const user = require("./routes/user");
const createPost = require("./routes/createpost");
mongoose.set("strictQuery",true);
mongoose.connect('mongodb://127.0.0.1:27017/Instgram')
.then(()=>{
    console.log("DB connected");
})
.catch((err)=>{
    console.log(err);
});
app.use(cors());
app.set("views",path.join(__dirname,"view"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); //static files
app.use(auth);
app.use(createPost)
app.use(user);
app.use(cookieParser());

app.use(async (req,res,next)=>{
    const {user_id} = req.cookies;
    if(user_id){
        try{
            const user = await User.findById(user_id);
            if(user)req.isAuthenticated =true;
        }
        catch(err){}
    }
    next();
})

app.listen(port,()=>{
    console.log(`server connected at port ${port}`);
});