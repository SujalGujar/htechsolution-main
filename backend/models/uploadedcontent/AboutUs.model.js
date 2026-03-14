import mongoose from "mongoose";

const aboutUsSchema = new mongoose.Schema(
  {
    heading: {
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
      type: String, // stores "/uploads/filename.jpg"
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("AboutUs", aboutUsSchema);