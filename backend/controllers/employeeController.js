const EmployeeModel=require("../models/employeeModel");
const TaskModel=require("../models/empTaskModel");
const empLogin=async(req,res)=>{
   const{email,password}=req.body;
   const employee=await EmployeeModel.findOne({email:email});
   if(!employee){
    res.status(400).send({msg:"Invalid Email"});
   }if(employee.password!=password){
    res.status(400).send({msg:"Invalid password"});
   }
   res.status(200).send({employee, msg:"Login Successfull"})
}
const getempTask=async(req,res)=>{
    const{id}=req.query;
    const task=await TaskModel.find({empid:id})
    res.send(task);
}
const setTaskStatus=async(req,res)=>{
    const{taskid,taskstatus,completionday}=req.body;
    const task=await TaskModel.findByIdAndUpdate(taskid,{
        taskstatus:taskstatus,
        completionday:completionday,
        tasksend:true
    })
    res.status(201).send(task,{msg:"Report Sent!"})
}
module.exports={
    empLogin,
    getempTask,
    setTaskStatus
}