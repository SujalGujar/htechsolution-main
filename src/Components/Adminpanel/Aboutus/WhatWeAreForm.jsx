import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const emptyForm = {
  id: "",
  title: "",
  content: "",
  image: "",
};

const WhatWeAreForm = () => {
  const [sections, setSections] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  const fetchSections = async () => {
    const res = await axios.get("http://localhost:5000/sections");
    setSections(res.data);
  };

  useEffect(() => {
    fetchSections();
  }, []);

  /* ---------- CREATE / UPDATE ---------- */
 const handleSubmit = async (e) => {
  e.preventDefault();

  const form = new FormData();
  form.append("id", formData.id);
  form.append("title", formData.title);
  form.append("content", formData.content);
  form.append("type", "whatWeAre"); 

  if (imageFile) {
    form.append("image", imageFile);
  }

  await axios.post("http://localhost:5000/sections", form);
  fetchSections();
};

  const resetForm = () => {
    setFormData(emptyForm);
    setImageFile(null);
    setPreview("");
    setEditingId(null);
  };

  /* ---------- EDIT ---------- */
  const startEdit = (section) => {
    setEditingId(section.id);
    setActiveId(section.id);
    setFormData(section);
    setPreview(section.image ? `http://localhost:5000${section.image}` : "");
  };

  /* ---------- DELETE ---------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this section?")) return;
    await axios.delete(`http://localhost:5000/sections/${id}`);
    fetchSections();
  };

  return (
    <section className="p-10 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-10">

        
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? "Edit Section" : "Add New Section"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="w-full border p-2 rounded"
            />

            <textarea
              placeholder="Content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              required
              className="w-full border p-2 rounded"
            />

            <input
              type="file"
              onChange={(e) => {
                setImageFile(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />

            {preview && (
              <img src={preview} className="h-24 rounded" />
            )}

            <div className="flex gap-3">
              <button  className="bg-blue-600 text-white px-4 py-2 rounded">
                {editingId ? "Update" : "Create"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* 🔹 SECTION LIST */}
        {sections.map((section) => (
          <motion.div
            key={section.id}
            layout
            className="bg-white p-6 rounded-xl shadow"
          >
            <div className="flex justify-between">
              <h3 className="text-lg font-bold">{section.title}</h3>
              <div className="flex gap-3 text-sm">
                <button
                  onClick={() => startEdit(section)}
                  className="text-blue-600"
                >
                  ✏ Edit
                </button>
                <button
                  onClick={() => handleDelete(section.id)}
                  className="text-red-600"
                >
                  🗑 Delete
                </button>
              </div>
            </div>

            <p className="mt-2 text-gray-600">{section.content}</p>

            {section.image && (
              <img
                src={`http://localhost:5000${section.image}`}
                className="mt-4 rounded-xl"
              />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhatWeAreForm;
