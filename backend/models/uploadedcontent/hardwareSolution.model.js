import mongoose from "mongoose";

const hardwareSolutionSchema = new mongoose.Schema(
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
    image: {
      type: String, // stores file path like "/uploads/filename.jpg"
      default: "",
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

export default mongoose.model("HardwareSolution", hardwareSolutionSchema);