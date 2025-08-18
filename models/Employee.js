const mongoose=require("mongoose");
const employeeSchema = new mongoose.Schema({
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
    } ,
    department:{
        type:String,
        required:true,
        trim:true
    },
    salary:{
        type:Number,
        required:true,
    },
});
module.exports=mongoose.model("Employee", employeeSchema); // converting schema into model to interact with mongodb