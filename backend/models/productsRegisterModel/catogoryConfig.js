// models/CategoryConfig.js
import mongoose from "mongoose";

// This sub-schema defines ONE field template
// e.g. { fieldName: "RAM", fieldKey: "ram", fieldType: "Number", unit: "GB" }
const configFieldSchema = new mongoose.Schema({
  fieldName: { type: String, required: true },
  // Display name shown to customer care → "RAM", "Processor", "Screen Size"

  fieldKey: { type: String, required: true },
  // Code-friendly key → "ram", "processor", "screenSize"
  // This becomes the KEY when storing actual product config values

  fieldType: { 
    type: String, 
    enum: ["String", "Number", "Boolean", "Date"], 
    default: "String" 
    // RAM = Number, Processor name = String, Has Backlit Keyboard = Boolean
  },

  unit: { type: String },
  // Optional unit for display → "GB", "inch", "GHz", "W"

  isRequired: { type: Boolean, default: false },
  // Is this field mandatory when registering a product?

  options: [String],
  // Optional dropdown choices → ["8GB", "16GB", "32GB"]
  // If empty, it's a free-text/number input
  
  _id: false // No need for _id on each field definition
});

const categoryConfigSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",   
      required: true,
      unique: true,       
    },
    fields: [configFieldSchema],
    
  },
  { timestamps: true }
);

const CategoryConfig = mongoose.model("CategoryConfig", categoryConfigSchema);
export default CategoryConfig;