const mongoose=require("mongoose");
const taskSchema=new mongoose.Schema({
    emptask:String,
    days:Number,
    priority:String,
    taskstatus:String,
    completionday:Number,
    empid:{type:mongoose.Schema.Types.ObjectId, ref:"employee"},
    tasksend:Boolean
})
module.exports=mongoose.model("emptask",taskSchema);