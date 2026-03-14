import mongoose from "mongoose";

const softwareProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: "",
    },
    
  },
  { timestamps: true }
);

// ✅ This line is what was missing — must have export default
export default mongoose.model("SoftwareProject", softwareProjectSchema);