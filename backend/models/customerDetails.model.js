// import mongoose from "mongoose";

// const customrDetailSchema = new mongoose.Schema({
//     customerName:{
//         type:String,
//         required:true,
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     mobileNum:{
//         type:Number,
//         required:true,
//         unique:true,
//     },
//     proName:{
//         type:String,
//         required:true,
//     },
//     proCatogory:{
//         type:String,
//         required:true,
//     },
//     proSrNo:{
//         type:String,
//         required:true,
//     },
//     proModNum:{
//         type:String ,
//         required:true,
//     },
//     warrStartDate: { type: Date, required: true },
//     warrEndDate: { type: Date, required: true },
    
//     password: { type: String },
//     ticketNumber: { type: String, unique: true }

    
// },{timestamps:true})

// const Customer =  mongoose.model("customerDetails",customrDetailSchema)
// export default Customer;


import mongoose from "mongoose";

const customerDetailsSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileNum: {
        type: Number,
        required: true
    },
    proName: {
        type: String,
        required: true
    },
    proCatogory: {
        type: String,
        required: true
    },
    proSrNo: {
        type: String,
        required: true,
        unique: true
    },
    proModNum: {
        type: String,
        required: true
    },
    ticketNumber: {  
        type: String,
        required: true,
        unique: true
    },
    warrStartDate: {
        type: Date,
        required: true
    },
    warrEndDate: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    plainPassword: { type: String ,
        
    },

}, {
    timestamps: true
});

const Customer = mongoose.model("customerdetails", customerDetailsSchema);
export default Customer;