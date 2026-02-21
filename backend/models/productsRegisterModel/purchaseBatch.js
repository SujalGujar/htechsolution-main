// models/PurchaseBatch.js
import mongoose from "mongoose";

const purchaseBatchSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      unique: true,
      // Auto-generated: TKT-20240210-48291
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    purchaseDate: { type: Date, required: true },

    vendorName: { type: String, required: true },

    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },

    totalQuantity: { type: Number, required: true },

    notes: { type: String },
  },
  { timestamps: true }
);

// Same ticket number logic you already use
purchaseBatchSchema.pre("save", async function () {
  if (this.ticketNumber) return;
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const rand = Math.floor(10000 + Math.random() * 90000);
  this.ticketNumber = `TKT-${y}${m}${d}-${rand}`;
});

const PurchaseBatch = mongoose.model("PurchaseBatch", purchaseBatchSchema);
export default PurchaseBatch;