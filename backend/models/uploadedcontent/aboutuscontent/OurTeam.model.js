import mongoose from "mongoose";

const ourTeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    linkedin: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    profileImage: {
      type: String, // stores "/uploads/filename.jpg"
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("OurTeam", ourTeamSchema);