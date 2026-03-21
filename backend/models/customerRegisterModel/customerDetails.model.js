import mongoose from "mongoose";
import {registeredProductSchema}  from "./registerProduct.model.js";

const customerDetailsSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },

    mobileNum: {
      type: String,
      required: true,
    },

    purchaseType: {
      type: String,
      enum: ["single", "bulk"],
      required: true,
    },

    products: {
      type: [registeredProductSchema],
      validate: {
        validator: function (arr) {
          if (this.purchaseType === "single") return arr.length === 1;
          if (this.purchaseType === "bulk") return arr.length >= 2;
          return arr.length >= 1;
        },
      },
    },

    status: {
      type: String,
      enum: ["active", "cancelled", "pending"],
      default: "active",
    },
  },
  { timestamps: true }
);

// 🔥 INDEX FOR FAST SEARCH
customerDetailsSchema.index({ "products.customerProductId": 1 },{ unique: true, sparse: true });

const Customer = mongoose.model("customerdetails", customerDetailsSchema);
export default Customer;