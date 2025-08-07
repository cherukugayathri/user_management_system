const mongoose=require("mongoose");
const employeeSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    department:{
        type:String,
        required:true,
        trim:true
    },
    salary:{
        type:Number,
        required:true,
        trim:true
    },
});
module.exports=mongoose.model("Employee", employeeSchema); // converting schema into model to interact with mongodb