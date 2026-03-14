import mongoose from "mongoose";

const clientExperienceSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // ✅ New field 1 — Project / Service Used
    projectService: {
      type: String,
      default: "",
    },
    // ✅ New field 2 — Rating (1-5)
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    image: {
      type: String, // stores "/uploads/filename.jpg"
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ClientExperience", clientExperienceSchema);