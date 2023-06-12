const mongoose=require("mongoose");
const { ObjectId } = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    Confirm_password:{
        type:String,
        require:true,
    }
})
let User = mongoose.model("User",userSchema);
module.exports=User;