import mongoose from "mongoose";

const ourAchievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: String,  
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,  
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("OurAchievement", ourAchievementSchema);