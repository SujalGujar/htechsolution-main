import { readSections, writeSections } from "../models/section.model.js";

export const getSections = async (_, res) => {
  const sections = await readSections();
  res.json(
    sections.map(s => ({
      ...s,
      imageUrl: s.image ? `http://localhost:5000${s.image}` : null
    }))
  );
};

export const saveSection = async (req, res) => {
  const sections = await readSections();
  const { id, title, content, color, type, startTime, endTime } = req.body;

  const image = req.file
    ? `/uploads/${req.file.filename}`
    : req.body.image || null;

  if (!id) {
    const section = {
      id: Date.now().toString(),
      title,
      content,
      color,
      type,
      startTime,
      endTime,
      image,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    sections.push(section);
    await writeSections(sections);
    return res.json({ success: true, section });
  }

  const index = sections.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ success: false });

  sections[index] = { ...sections[index], ...req.body, image, updatedAt: new Date() };
  await writeSections(sections);

  res.json({ success: true, section: sections[index] });
};

export const deleteSection = async (req, res) => {
  const sections = await readSections();
  const filtered = sections.filter(s => s.id !== req.params.id);
  await writeSections(filtered);
  res.json({ success: true });
};
