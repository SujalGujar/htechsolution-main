import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExperiences,
  addExperience,
  updateExperience,
  deleteExperience,
} from "../../store/HomepageSlices/ClientExperienceSlice";

const BASE_URL = "http://localhost:5000";

// ✅ Star Rating Selector Component
const StarSelector = ({ value, onChange }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`text-2xl transition-colors ${
            star <= value ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </button>
      ))}
      <span className="ml-2 text-sm text-gray-500 self-center">
        {value}/5
      </span>
    </div>
  );
};

const ClientExperienceForm = () => {
  const dispatch = useDispatch();
  const { experiences, loading, error } = useSelector(
    (state) => state.clientExperience
  );

  const [editId,     setEditId]     = useState(null);
  const [imageFile,  setImageFile]  = useState(null);
  const [preview,    setPreview]    = useState("");
  const [formData,   setFormData]   = useState({
    heading:        "",
    role:           "",
    description:    "",
    projectService: "", // ✅ new field
    rating:         5,  // ✅ new field default 5
  });

  // ✅ Fetch on mount
  useEffect(() => {
    dispatch(fetchExperiences());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Use FormData for real file upload
    const data = new FormData();
    data.append("heading",        formData.heading);
    data.append("role",           formData.role);
    data.append("description",    formData.description);
    data.append("projectService", formData.projectService);
    data.append("rating",         formData.rating);
    if (imageFile) data.append("image", imageFile);

    if (editId) {
      dispatch(updateExperience({ id: editId, formData: data }));
      setEditId(null);
    } else {
      dispatch(addExperience(data));
    }

    resetForm();
  };

  const handleEdit = (item) => {
    setEditId(item._id); // ✅ use _id
    setFormData({
      heading:        item.heading        || "",
      role:           item.role           || "",
      description:    item.description    || "",
      projectService: item.projectService || "",
      rating:         item.rating         || 5,
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
    if (window.confirm("Delete this experience?")) {
      dispatch(deleteExperience(id));
    }
  };

  const resetForm = () => {
    setFormData({
      heading: "", role: "", description: "",
      projectService: "", rating: 5,
    });
    setEditId(null);
    setImageFile(null);
    setPreview("");
  };

  return (
    <div className="max-w-2xl bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Client Experience Manager</h2>

      {error && (
        <div className="bg-red-100 text-red-600 p-2 rounded mb-3 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="heading"
          placeholder="Client Name *"
          value={formData.heading}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="role"
          placeholder="Client Role / Company *"
          value={formData.role}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Experience Description *"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={3}
          required
        />

        {/* ✅ New Field 1 — Project / Service Used */}
        <input
          type="text"
          name="projectService"
          placeholder="Project / Service Used (e.g. Web Development)"
          value={formData.projectService}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* ✅ New Field 2 — Star Rating */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Rating
          </label>
          <StarSelector
            value={formData.rating}
            onChange={(val) => setFormData({ ...formData, rating: val })}
          />
        </div>

        {/* Image upload */}
        <input type="file" accept="image/*" onChange={handleImage} />
        {preview && (
          <img src={preview} className="w-12 h-12 rounded object-cover" alt="preview" />
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#1F6E8C] text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Saving..." : editId ? "Update" : "Add Experience"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border rounded text-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* LIST */}
      <div className="mt-6 space-y-3">
        {experiences.map((item) => (
          <div
            key={item._id} // ✅ use _id
            className="flex justify-between items-center border p-3 rounded"
          >
            <div className="flex items-center gap-3">
              {item.image && (
                <img
                  src={
                    item.image.startsWith("http")
                      ? item.image
                      : `${BASE_URL}${item.image}`
                  }
                  className="w-10 h-10 rounded object-cover"
                  alt={item.heading}
                />
              )}
              <div>
                <p className="font-semibold">{item.heading}</p>
                <p className="text-xs text-gray-500">{item.projectService}</p>
                {/* ✅ Star display in list */}
                <div className="flex text-yellow-400 text-sm">
                  {[1,2,3,4,5].map((s) => (
                    <span key={s}>{s <= item.rating ? "★" : "☆"}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-600 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)} // ✅ use _id
                className="text-red-600 text-sm"
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

export default ClientExperienceForm;