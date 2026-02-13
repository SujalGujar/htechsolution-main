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


// import mongoose from "mongoose";

// const customerDetailSchema = new mongoose.Schema(
//   {
//     customerName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     mobileNum: { type: Number, required: true, unique: true },

//     proName: { type: String, required: true },
//     proCatogory: { type: String, required: true },
//     proSrNo: { type: Number, required: true, unique: true },
//     proModNum: { type: Number, required: true, unique: true },
//     brandName: { type: String, required: true },

//     purDate: { type: Date, required: true },
//     invoiceNum: { type: Number, required: true, unique: true },

//     warrStartDate: { type: Date, required: true },
//     warrEndDate: { type: Date, required: true },

//     TicketNumber: { type: String, unique: true },
//     password: { type: String }
//   },
//   { timestamps: true }
// );


//  customerDetailSchema.pre("save", function (next) {
//   if (this.TicketNumber) return next();

//   const date = new Date();
//   const y = date.getFullYear();
//   const m = String(date.getMonth() + 1).padStart(2, "0");
//   const d = String(date.getDate()).padStart(2, "0");

//   const rand = Math.floor(10000 + Math.random() * 90000);

//   this.TicketNumber = `TKT-${y}${m}${d}-${rand}`;
//   next();
// });
import mongoose from "mongoose";

const productDetailSchema = new mongoose.Schema(
  {
    // customerName: { type: String, required: true, trim: true },

    // email: { type: String, required: true, lowercase: true },
    // mobileNum: { type: String, required: true },

    proName: { type: String, required: true },
    proCatogory: { type: String, required: true },

    proSrNo: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    proModNum: {
      type: String,
      required: true,
      trim: true
    },

    brandName: { type: String, required: true },

    purDate: { type: Date, required: true },

    invoiceNum: {
      type: String,
      required: true,
      unique: true
    },

    // warrStartDate: { type: Date, required: true },
    // warrEndDate: { type: Date, required: true },

    TicketNumber: { type: String, unique: true },

    // password: { type: String } // if customer login needed
  },
  { timestamps: true }
);
productDetailSchema.pre("save", async function () {
  // Remove 'next' parameter
  if (this.TicketNumber) return; // Just return, no next()

  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.floor(10000 + Math.random() * 90000);

  this.TicketNumber = `TKT-${y}${m}${d}-${rand}`;
  // No next() call needed
});



const Product = mongoose.model("productDetail", productDetailSchema);
export default Product;
