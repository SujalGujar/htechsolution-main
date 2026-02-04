import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "../sections.json");

if (!fs.existsSync(DATA_FILE)) fs.writeJsonSync(DATA_FILE, []);

export const readSections = () => fs.readJson(DATA_FILE);
export const writeSections = (data) => fs.writeJson(DATA_FILE, data);
