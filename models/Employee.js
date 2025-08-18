const mongoose=require("mongoose");
const employeeSchema = new mongoose.Schema({
    id:{
        type:String,// id = username
        required:true,
        unique:true, // to avoid duplicates
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
        required:false,
        trim:true
    },
    salary:{
        type:Number,
        required:false,
    },
    }, { timestamps: true }); // adds createdAt and updatedAt

module.exports=mongoose.model("Employee", employeeSchema); // converting schema into model to interact with mongodb