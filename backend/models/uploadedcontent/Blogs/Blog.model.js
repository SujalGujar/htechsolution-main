import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    // ✅ Video field
    video: {
      type: String,
      default: "",
    },
    // ✅ Media type — image or video
    mediaType: {
      type: String,
      enum: ["image", "video", "none"],
      default: "none",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);