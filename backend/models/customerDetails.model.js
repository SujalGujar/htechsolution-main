import mongoose from "mongoose";

const customrDetailSchema = new mongoose.Schema({
    customerName:{
        type:String,
        reaquired:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobileNum:{
        type:Number,
        required:true,
        unique:true,
    },
    proName:{
        type:String,
        required:true,
    },
    proCatogory:{
        type:String,
        required:true,
    },
    proSrNo:{
        type:String,
        required:true,
    },
    proModNum:{
        type:String,
        required:true,
    },
    password: { type: String } 

    
},{timestamps:true})

const Customer =  mongoose.model("customerDetails",customrDetailSchema)
export default Customer;