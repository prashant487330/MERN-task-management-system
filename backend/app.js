const express=require("express");
const app=express();
const cors=require("cors");
const bodyparser=require("body-parser");
const mongoose=require("mongoose");
require("dotenv").config();

const AdminRoute=require("./routes/adminRoute")
const EmployeeRoute=require("./routes/employeeRoute")

mongoose.connect(process.env.DBCONN).then(()=>{
    console.log("Database Connected Successfully");
})

app.use(cors());
//body-parser middleware
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

app.use("/admin",AdminRoute);
app.use("/employee",EmployeeRoute);

const Port=process.env.PORT;
app.listen(Port,()=>{
    console.log(`Server run on Port ${Port}!`);
})