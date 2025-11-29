import mongoose from "mongoose";
const EmployeeSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:String,
    salary:String,
    phone:String,
    position:{
        type:String,
        enum:["Frontend Developer","Backend Developer","Full Stack Developer"]
        
    },
    createdAt:{type:Date, default: Date.now}

})

export default mongoose.model("Employee",EmployeeSchema);