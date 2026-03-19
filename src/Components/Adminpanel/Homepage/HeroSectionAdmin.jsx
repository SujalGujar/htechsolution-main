import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHeroSections,
  addHeroSection,
  updateHeroSection,
  deleteHeroSection,
} from "../../store/HomepageSlices/HeroSectionSlice";

// ✅ Removed convertToBase64 - using real file upload now
const BASE_URL = "https://htechsolution-main.onrender.com";

const HeroSectionAdmin = () => {
  const dispatch = useDispatch();
  const { heroList, loading, error } = useSelector(
    (state) => state.heroSection
  );

  const [editId,     setEditId]     = useState(null);
  const [imageFile,  setImageFile]  = useState(null);
  const [preview,    setPreview]    = useState("");
  const [formData,   setFormData]   = useState({
    heading:     "",
    description: "",
  });

  // ✅ Fetch on mount
  useEffect(() => {
    dispatch(fetchHeroSections());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Real file upload - not base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ FormData for real file upload
    const data = new FormData();
    data.append("heading",     formData.heading);
    data.append("description", formData.description);
    if (imageFile) data.append("image", imageFile);

    if (editId !== null) {
      dispatch(updateHeroSection({ id: editId, formData: data }));
      setEditId(null);
    } else {
      dispatch(addHeroSection(data));
    }

    resetForm();
  };

  const handleEdit = (item) => {
    setEditId(item._id); // ✅ use _id not index
    setFormData({
      heading:     item.heading,
      description: item.description,
    });
    setPreview(
      item.image
        ? item.image.startsWith("http")
          ? item.image
          : `${BASE_URL}${item.image}`
        : ""
    );
    setImageFile(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this hero section?")) {
      dispatch(deleteHeroSection(id)); // ✅ use _id not index
    }
  };

  const resetForm = () => {
    setFormData({ heading: "", description: "" });
    setEditId(null);
    setImageFile(null);
    setPreview("");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Hero Section Admin</h2>

      {/* Error message */}
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        {/* ✅ Real file input - not base64 */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 w-full rounded"
        />

        {/* Image preview */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-32 h-20 object-cover rounded"
          />
        )}

        <input
          type="text"
          name="heading"
          value={formData.heading}
          onChange={handleChange}
          placeholder="Hero Heading"
          className="border p-2 w-full rounded"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Hero Description"
          rows="3"
          className="border p-2 w-full rounded"
          required
        />

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded text-white disabled:opacity-50 ${
              editId !== null ? "bg-green-600" : "bg-blue-600"
            }`}
          >
            {loading ? "Saving..." : editId !== null ? "Update" : "Add"}
          </button>

          {editId !== null && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 rounded border text-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* LIST */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Hero Content List</h3>

        {heroList.length === 0 && (
          <p className="text-gray-500">No hero content added yet.</p>
        )}

        {heroList.map((item) => (
          <div
            key={item._id} // ✅ use _id not index
            className="border p-4 rounded mb-4 flex justify-between"
          >
            <div>
              {item.image && (
                <img
                  // ✅ Full image URL
                  src={
                    item.image.startsWith("http")
                      ? item.image
                      : `${BASE_URL}${item.image}`
                  }
                  alt="Hero"
                  className="w-32 h-20 object-cover mb-2 rounded"
                />
              )}
              <h4 className="font-semibold">{item.heading}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>

            <div className="space-x-2 flex items-start">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)} // ✅ use _id
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

export default HeroSectionAdmin;
