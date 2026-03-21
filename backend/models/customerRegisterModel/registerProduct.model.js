import mongoose from "mongoose";

const registeredProductSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      required: true,
      trim: true,
    },

    // ⭐ NEW FIELD (IMPORTANT)
    customerProductId: {
      type: String,
      unique: true,
    },

    productRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },

    categoryRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    configSnapshot: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },

    warrStartDate: {
      type: Date,
      required: true,
    },

    warrEndDate: {
      type: Date,
      required: true,
    },
  },
  { _id: true }
);

export { registeredProductSchema };