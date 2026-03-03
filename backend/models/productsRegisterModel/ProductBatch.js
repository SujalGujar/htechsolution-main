import mongoose from "mongoose";

const productBatchSchema = new mongoose.Schema(
  {
    batchTicket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PurchaseBatch",
      required: true
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    configurations: {
      type: Map,
      of: mongoose.Schema.Types.Mixed
    },

    quantity: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("ProductBatch", productBatchSchema);