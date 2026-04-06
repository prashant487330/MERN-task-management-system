const express=require("express");
const route=express.Router();
const EmployeeController=require("../controllers/employeeController");

route.post("/employeelogin",EmployeeController.empLogin);
route.get("/getemptask",EmployeeController.getempTask);
route.post("/settaskstatus",EmployeeController.setTaskStatus);

module.exports=route;