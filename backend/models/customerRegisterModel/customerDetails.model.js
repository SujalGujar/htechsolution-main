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


import mongoose, { Schema } from "mongoose";

// const customerDetailsSchema = new mongoose.Schema({
//     customerName: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     mobileNum: {
//         type: Number,
//         required: true
//     },
//     configurations: {
//           type: Map,
//           of: mongoose.Schema.Types.Mixed,
//           default: {},
//         },
    
//     // proName: {
//     //     type: String,
//     //     required: true
//     // },
//     // proCatogory: {
//     //     type: String,
//     //     required: true
//     // },
//     // proSrNo: {
//     //     type: String,
//     //     required: true,
//     //     unique: true
//     // },
//     // proModNum: {
//     //     type: String,
//     //     required: true
//     // },
//     // ticketNumber: {  
//     //     type: String,
//     //     required: true,
//     //     unique: true
//     // },
//     warrStartDate: {
//         type: Date,
//         required: true
//     },
//     warrEndDate: {
//         type: Date,
//         required: true
//     },
//     // password: {
//     //     type: String,
//     //     required: true
//     // },
//     // plainPassword: { type: String ,
        
//     // },

// }, {
//     timestamps: true
// });

// const Customer = mongoose.model("customerdetails", customerDetailsSchema);
// export default Customer;





// ─────────────────────────────────────────────────────────────────────────────
//  MAIN SCHEMA: Customer Registration
import {registeredProductSchema} from "./registerProduct.model.js";
const customerDetailsSchema = new mongoose.Schema(
  {
    // ── Customer Info (entered manually in form) ───────────────────────────
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      // Not unique — same customer can register multiple orders over time
    },

    mobileNum: {
      type: String,             // String to preserve leading 0 / +91 prefix
      required: [true, "Mobile number is required"],
      trim: true,
    },

    // ── Purchase Type ──────────────────────────────────────────────────────
    purchaseType: {
      type: String,
      enum: ["single", "bulk"],
      required: [true, "Purchase type is required"],
    },

    // ── Products ───────────────────────────────────────────────────────────
    // Each product = one ticketNumber copied from ProductHistory component
    // single → exactly 1 item
    // bulk   → 2 or more items
    products: {
      type: [registeredProductSchema],
      validate: {
        validator: function (arr) {
          if (this.purchaseType === "single") return arr.length === 1;
          if (this.purchaseType === "bulk")   return arr.length >= 2;
          return arr.length >= 1;
        },
        message:
          "Single purchase must have exactly 1 product. Bulk purchase must have 2 or more.",
      },
    },

   
    status: {
      type: String,
      enum: ["active", "cancelled", "pending"],
      default: "active",
    },
  },
  {
    timestamps: true,   // createdAt, updatedAt
  }
);

// ─── Indexes ──────────────────────────────────────────────────────────────────
customerDetailsSchema.index({ email: 1 });
customerDetailsSchema.index({ "products.ticketNumber": 1 });   // fast ticket lookup
customerDetailsSchema.index({ "products.productRef": 1 });
customerDetailsSchema.index({ purchaseType: 1 });
customerDetailsSchema.index({ createdAt: -1 });

const Customer = mongoose.model("customerdetails", customerDetailsSchema);
export default Customer;