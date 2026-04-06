const mongoose=require("mongoose");
const employeeSchema=new mongoose.Schema({
    name:String,
    email:String,
    post:String,
    password:String   
    
})
module.exports=mongoose.model("employee",employeeSchema);