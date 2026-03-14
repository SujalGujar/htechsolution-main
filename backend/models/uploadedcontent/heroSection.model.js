import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE = path.join(__dirname, "../heroSection.json");

if (!fs.existsSync(FILE)) fs.writeJsonSync(FILE, []);

export const readHeroSections = () => fs.readJson(FILE);
export const writeHeroSections = (data) => fs.writeJson(FILE, data);import mongoose from "mongoose";

const heroSectionSchema = new mongoose.Schema(
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
    image: {
      type: String, // stores "/uploads/filename.jpg"
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("HeroSection", heroSectionSchema);