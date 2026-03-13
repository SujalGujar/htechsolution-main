import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE = path.join(__dirname, "../hardwareSolutions.json");
if (!fs.existsSync(FILE)) fs.writeJsonSync(FILE, []);

export const readSolutions = () => fs.readJson(FILE);
export const writeSolutions = (data) => fs.writeJson(FILE, data);