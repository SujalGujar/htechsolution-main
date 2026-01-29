import { readDeliverables, writeDeliverables } from "../models/deliverable.model.js";

export const getDeliverables = async (_, res) => {
  res.json(await readDeliverables());
};

export const saveDeliverable = async (req, res) => {
  let data = await readDeliverables();
  const { id, title, review, methodology } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

  if (id) {
    data = data.map(d =>
      d.id === id ? { ...d, title, review, methodology, image } : d
    );
  } else {
    data.push({ id: Date.now().toString(), title, review, methodology, image });
  }

  await writeDeliverables(data);
  res.json({ success: true });
};

export const deleteDeliverable = async (req, res) => {
  let data = await readDeliverables();
  data = data.filter(d => d.id !== req.params.id);
  await writeDeliverables(data);
  res.json({ success: true });
};
