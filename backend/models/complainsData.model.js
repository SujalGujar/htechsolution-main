// models/complainsData.model.js
import mongoose from "mongoose";

const complainDataSchema = new mongoose.Schema(
  {
    // Customer Details
    customerName:  { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },

    // Product Details
    ticketNumber:    { type: String, required: true, unique: true, index: true },
    // WHY index: true — customer care searches by ticketNumber constantly.
    // An index makes MongoDB find it instantly instead of scanning every document.
    productName:     { type: String },
    serialNumber:    { type: String },
    purchaseDate:    { type: Date },
    warrantyStatus:  {
      type: String,
      enum: ["In Warranty", "Out of Warranty"],
      default: "In Warranty",
    },

    // Complaint Details
    issueTitle:       { type: String, required: true },
    issueDescription: { type: String, required: true },
    issueType: {
      type: String,
      enum: ["Hardware", "Software", "Installation", "Other"],
    },

    // Complaint Tracking
    complaintId: { type: String, unique: true },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved", "Closed"],
      default: "Pending",
    },

    // Customer care agent can add internal notes
    agentNotes: { type: String, default: "" },
    resolvedAt: { type: Date },
  },
  { timestamps: true }
);

const complainData = mongoose.model("complainData", complainDataSchema);
export default complainData;