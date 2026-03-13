// import { readDeliverables, writeDeliverables } from "../models/heroSection.model.js";

// export const getDeliverables = async (_, res) => {
//   res.json(await readDeliverables());
// };

// export const saveDeliverable = async (req, res) => {
//   let data = await readDeliverables();
//   const { id, title, review, methodology } = req.body;
//   const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

//   if (id) {
//     data = data.map(d =>
//       d.id === id ? { ...d, title, review, methodology, image } : d
//     );
//   } else {
//     data.push({ id: Date.now().toString(), title, review, methodology, image });
//   }

//   await writeDeliverables(data);
//   res.json({ success: true });
// };

// export const deleteDeliverable = async (req, res) => {
//   let data = await readDeliverables();
//   data = data.filter(d => d.id !== req.params.id);
//   await writeDeliverables(data);
//   res.json({ success: true });
// };


import { readHeroSections, writeHeroSections } from "../../models/uploadedcontent/heroSection.model.js";

export const getHeroSections = async (_, res) => {
  const data = await readHeroSections();
  // Prefix full image URL so frontend can display it
  const result = data.map(item => ({
    ...item,
    image: item.image ? `http://localhost:5000${item.image}` : null,
  }));
  res.json(result);
};

export const saveHeroSection = async (req, res) => {
  let data = await readHeroSections();
  const { id, heading, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image || null;

  if (id) {
    // Update existing
    data = data.map(item =>
      item.id === id ? { ...item, heading, description, image } : item
    );
  } else {
    // Add new
    data.push({
      id: Date.now().toString(),
      heading,
      description,
      image,
      createdAt: new Date(),
    });
  }

  await writeHeroSections(data);
  res.json({ success: true });
};

export const deleteHeroSection = async (req, res) => {
  let data = await readHeroSections();
  data = data.filter(item => item.id !== req.params.id);
  await writeHeroSections(data);
  res.json({ success: true });
};