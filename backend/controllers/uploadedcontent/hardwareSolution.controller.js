import { readSolutions, writeSolutions } from "../../models/uploadedcontent/hardwareSolution.model.js";

export const getSolutions = async (_, res) => {
  const data = await readSolutions();
  res.json(data.map(item => ({
    ...item,
    image: item.image ? `http://localhost:5000${item.image}` : null,
  })));
};

export const saveSolution = async (req, res) => {
  let data = await readSolutions();
  const { id, title, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image || null;

  if (id) {
    data = data.map(item => item.id === id ? { ...item, title, description, image } : item);
  } else {
    data.push({ id: Date.now().toString(), title, description, image, createdAt: new Date() });
  }

  await writeSolutions(data);
  res.json({ success: true, ...data.find(d => d.title === title) });
};

export const deleteSolutionById = async (req, res) => {
  let data = await readSolutions();
  data = data.filter(item => item.id !== req.params.id);
  await writeSolutions(data);
  res.json({ success: true });
};