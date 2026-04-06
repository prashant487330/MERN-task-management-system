const AdminModel = require("../models/adminModel");
const EmployeeModel = require("../models/employeeModel");
const EmployeePassword = require("../middlewares/employeePassword");
const Nodemailer = require("nodemailer")
const TaskModel = require("../models/empTaskModel")
const adminLogin = async (req, res) => {
   const { email, password } = req.body;
   const admin = await AdminModel.findOne({ email: email });
   if (!admin) {
      res.status(400).send({ msg: "Invalid Email" });
   }
   if (admin.password != password) {
      res.status(400).send({ msg: "Invalid Password" });
   }
   res.send({ admin, msg: "Login Successfull" });
}
const createUser = async (req, res) => {
   const { name, email, post } = req.body;
   const emppass = EmployeePassword.randomPassword();
   let transporter = Nodemailer.createTransport({
      service: 'gmail',
      auth: {
         user: 'prashantpatel487330@gmail.com',
         pass: process.env.APP_PASS
      }
   });
   let mailOptions = {
      from: 'prashantpatel487330@gmail.com',
      to: email,
      subject: 'Employee Task Management Login Pssword',
      text: `Greetings \n Welcome:${name} \n Email Id:${email} \n
      Login Password:${emppass}`
   };
   const emp = await EmployeeModel.create({
      name: name,
      email: email,
      post: post,
      password: emppass
   })
   transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
         console.log(error);
      } else {
         console.log('Email sent');
      }
   })
   res.status(200).send({ msg: "Email Successfully sent & Employee created" })
}
const getEmpData = async (req, res) => {
   const employee = await EmployeeModel.find();
   res.send(employee)
}
const assigTask = async (req, res) => {
   const { empid, emptask, days, priority } = req.body;
   const task = await TaskModel.create({
      emptask: emptask,
      days: days,
      empid: empid,
      priority: priority
   })
   res.status(201).send(task,{msg:"Task Assigned"});
}
const getTaskReport = async (req, res) => {
   const task = await TaskModel.find().populate("empid")
   res.send(task);
}
const taskReassign = async (req, res) => {
   const { tid } = req.query;
   const task = await TaskModel.findByIdAndUpdate(tid, {
      tasksend: false
   })
   res.status(200).send(task,{msg:"Task Reassgined"});
}
module.exports = {
   adminLogin,
   createUser,
   getEmpData,
   assigTask,
   getTaskReport,
   taskReassign
}