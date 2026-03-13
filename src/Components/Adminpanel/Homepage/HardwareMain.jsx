import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSolutions,
  addSolution,
  updateSolution,
  deleteSolution,
} from "../../store/HomepageSlices/HardwareSlice";

const BASE_URL = "http://localhost:5000";
const EMPTY_FORM = { title: "", description: "" };

const HardwareMain = () => {
  const dispatch = useDispatch();
  const { solutions, loading, error } = useSelector(
    (state) => state.softwareSolutions
  );

  const [editId, setEditId]       = useState(null); // store id, not index
  const [formData, setFormData]   = useState({ ...EMPTY_FORM });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview]     = useState("");

  // ── Fetch on mount ────────────────────────────────────────────────────────
  useEffect(() => {
    dispatch(fetchSolutions());
  }, [dispatch]);

  // ── Input change ──────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ── Image select ──────────────────────────────────────────────────────────
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file)); // local preview only
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (imageFile) data.append("image", imageFile);

    if (editId === null) {
      await dispatch(addSolution(data));
    } else {
      await dispatch(updateSolution({ id: editId, formData: data }));
    }

    // Reset
    setEditId(null);
    setFormData({ ...EMPTY_FORM });
    setImageFile(null);
    setPreview("");
    e.target.reset();
  };

  // ── Edit ──────────────────────────────────────────────────────────────────
  const handleEdit = (item) => {
    setEditId(item.id);
    setFormData({ title: item.title, description: item.description });
    setPreview(item.image || ""); // show existing image as preview
    setImageFile(null);
  };

  // ── Delete ────────────────────────────────────────────────────────────────
  const handleDelete = (id) => {
    dispatch(deleteSolution(id));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin – Hardware Solutions</h1>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-10">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 w-full mb-3"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full mb-3"
          required
        />

        <input type="file" accept="image/*" onChange={handleImageUpload} />

        {preview && (
          <img src={preview} alt="preview" className="w-24 mt-3 rounded" />
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 mt-4 rounded disabled:opacity-50"
        >
          {loading ? "Saving..." : editId === null ? "Add Solution" : "Update Solution"}
        </button>

        {editId !== null && (
          <button
            type="button"
            onClick={() => { setEditId(null); setFormData({ ...EMPTY_FORM }); setPreview(""); }}
            className="ml-3 bg-gray-400 text-white px-6 py-2 mt-4 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      {/* LIST */}
      {loading && <p className="text-gray-500 mb-4">Loading...</p>}

      <div className="grid md:grid-cols-3 gap-6">
        {solutions.map((item) => (
          <div key={item.id} className="bg-white p-4 shadow rounded">
            {item.image && (
              <img
                src={item.image?.startsWith("http") ? item.image : `${BASE_URL}${item.image}`}
                alt={item.title}
                className="h-40 w-full object-cover rounded"
              />
            )}
            <h3 className="font-bold mt-2">{item.title}</h3>
            <p className="text-sm">{item.description}</p>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HardwareMain;