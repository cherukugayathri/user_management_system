// creation of user model
const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
  id:{
    type:String,
    required:true,
    unique:true, // to avoid duplicates // id = username
  },
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true
  },
  password:{
    type:String,
    required:true,
    minimum_length:6,
  },
  firstName:{
    type:String,
    required:true,
    trim:true,
  },
  lastName:{
    type:String,
    required:true,
    trim:true,
  },
}, {
    timestamps:true // adds createdAt and updatedAt fields
});
module.exports=mongoose.model("User",userSchema);