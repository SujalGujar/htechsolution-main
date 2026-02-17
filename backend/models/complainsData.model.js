// import mongoose from "mongoose";

// const complainDataSchema = new mongoose.Schema({
//     customerName:{
//         type:String,
//         required:true,
//     },mobileNumber:{
//         type:Number,
//         required:true
//     },
//   productName:{
//     type:String,
//     required:true
//   },
//   serialNumber:{
//     type:String,
//     required:true
    
//   },
//   complaintTitle:{
//     type:String,
//     required:true
//   },
//   complaintDescription:{
//     type:String,
//     required:true
//   },
//   ticketNumber:{
//     type:String,
//     required:true,
//     unique:true
//   },
//   status:{
//     type:String,
//     enum:["pending", "processing", "completed"],
//     default:"pending"
//   }
// },{timestamps:true})



// const complainData = mongoose.model("complainData",complainDataSchema);

// export default complainData;

import mongoose from "mongoose";

const complainDataSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: String,
    required: true,
  },
  // ── NEW FIELDS ──────────────────────────────────────────────────────────
  invoiceNumber: {
    type: String,
    required: false,
    default: "",
  },
  brandName: {
    type: String,
    required: false,
    default: "",
  },
  // ────────────────────────────────────────────────────────────────────────
  complaintTitle: {
    type: String,
    required: true,
  },
  complaintDescription: {
    type: String,
    required: true,
  },
  ticketNumber: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "completed"],
    default: "pending",
  },
}, { timestamps: true });

const complainData = mongoose.model("complainData", complainDataSchema);

export default complainData;