const express=require("express");
const route=express.Router();
const AdminController=require("../controllers/adminController");

route.post("/adminlogin",AdminController.adminLogin);
route.post("/createuser",AdminController.createUser);
route.get("/getempdata",AdminController.getEmpData);
route.post("/assigntask",AdminController.assigTask);
route.get("/gettaskreport",AdminController.getTaskReport);
route.post("/taskreassign",AdminController.taskReassign);

module.exports=route;