import mongoose from "mongoose";

const projectDeliverableSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    review: {
      type: String,
      required: true,
    },
    methodology: {
      type: String,
      required: true,
    },
    image: {
      type: String, // stores "/uploads/filename.jpg"
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ProjectDeliverable", projectDeliverableSchema);