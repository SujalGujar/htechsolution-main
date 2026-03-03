import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      unique: true
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    productName: {
      type: String,
      required: true
    },

    configurations: {
      type: Map,
      of: mongoose.Schema.Types.Mixed
    },

    status: {
      type: String,
      enum: ["available", "sold", "damaged"],
      default: "available"
    }
  },
  { timestamps: true }
);


productSchema.pre("save", function (next) {
  if (this.ticketNumber) return next();

  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.floor(10000 + Math.random() * 90000);

  this.ticketNumber = `PRD-${y}${m}${d}-${rand}`;

  next();
});

export default productRegisterSchema = mongoose.model("Product", productSchema);