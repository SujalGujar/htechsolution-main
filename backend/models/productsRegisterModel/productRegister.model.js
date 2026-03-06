// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     ticketNumber: {
//       type: String,
//       unique: true
//     },

//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true
//     },

//     productName: {
//       type: String,
//       required: true
//     },
//     // companyName:{
//     //   type:String,
//     //   required:true
//     // },

//     configurations: {
//       type: Map,
//       of: mongoose.Schema.Types.Mixed
//     },

    
//   },
//   { timestamps: true }
// );

// productSchema.pre("save", async function () {
//   if (this.ticketNumber) return;

//   const date = new Date();
//   const y = date.getFullYear();
//   const m = String(date.getMonth() + 1).padStart(2, "0");
//   const d = String(date.getDate()).padStart(2, "0");
//   const rand = Math.floor(10000 + Math.random() * 90000);

//   this.ticketNumber = `PRD-${y}${m}${d}-${rand}`;
// });

// export default mongoose.model("Product", productSchema);

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      unique: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // productName removed — fields are managed dynamically via configurations
    // companyName removed — same reason

    configurations: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

productSchema.pre("save", async function () {
  if (this.ticketNumber) return;

  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.floor(10000 + Math.random() * 90000);

  this.ticketNumber = `PRD-${y}${m}${d}-${rand}`;
});

export default mongoose.model("Product", productSchema);