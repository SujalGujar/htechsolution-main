// import mongoose, { trusted } from "mongoose"

// const customerDetailSchema = new mongoose.Schema({
//    customerName:{
//       type:String,
//       required:true,
      
//     },email:{
//     type:String,
//     required:true,
//     unique:true
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
//         type:Number,
//         required:true,
//         unique:true
//     },
//     proModNum:{
//         type:Number,
//         required:true,
//         unique:true
//     },
//     brandName:{
//         type:String,
//         required:true,

//     },
//     purDate:{
//         type:Date,
//         required:true,
//     },
//     invoiceNum:{
//         type:Number,
//         required:true,
//         unique:true
//     },
//     warrStartDate:{
//         type:Date,
//         required:true,

//     },
//     warrEndDate:{
//         type:Date,
//         required:true,
//     }
//     ,TicketNumber:{
//         type:String,
//         unique:true,

//     }
// },{timestamps:true})

// export const autoGenerateTicketNumber = customerDetailSchema.pre("save",function(next){
//     if(this.TicketNumber){
//         return next();
//     }

//     const date = new Date();
//     const y = date.getFullYear()
//     const m = String(date.getMonth()+1).padStart(2,"0");
// const d = String(date.getDate()).padStart(2, "0");
    
//     const rand = Math.floor(10000+Math.random()*90000);
//     this.TicketNumber = `TKT-${y}${m}${d}-${rand}`;
//     next();
// });



// export default mongoose.model("customerDetail",customerDetailSchema)


import mongoose from "mongoose";

const customerDetailSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNum: { type: Number, required: true, unique: true },

    proName: { type: String, required: true },
    proCatogory: { type: String, required: true },
    proSrNo: { type: Number, required: true, unique: true },
    proModNum: { type: Number, required: true, unique: true },
    brandName: { type: String, required: true },

    purDate: { type: Date, required: true },
    invoiceNum: { type: Number, required: true, unique: true },

    warrStartDate: { type: Date, required: true },
    warrEndDate: { type: Date, required: true },

    TicketNumber: { type: String, unique: true },
    password: { type: String }
  },
  { timestamps: true }
);


 customerDetailSchema.pre("save", async function () {
  if (this.TicketNumber) return;

  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");

  const rand = Math.floor(10000 + Math.random() * 90000);

  this.TicketNumber = `TKT-${y}${m}${d}-${rand}`;
});


const Customer = mongoose.model("customerDetail", customerDetailSchema);
export default Customer;
