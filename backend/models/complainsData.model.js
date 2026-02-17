import mongoose from "mongoose";

const complainDataSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  serialNumber: {
    type: String,
    required: true
  },
  complaintTitle: {
    type: String,
    required: true
  },
  complaintDescription: {
    type: String,
    required: true
  },
  ticketNumber: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ["open", "in progress", "resolved"],
    default: "open"
  }
}, { timestamps: true });

const complainData = mongoose.model("complainData", complainDataSchema);

export default complainData;
