import mongoose from "mongoose";

const productItemSchema = new mongoose.Schema(
  {
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductBatch",
      required: true
    },

    serialNumber: {
      type: String,
      unique: true
    },

    
  },
  { timestamps: true }
);

export default mongoose.model("ProductItem", productItemSchema);