import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAchievements,
  addAchievement,
  updateAchievement,
  deleteAchievement,
} from "../../store/HomepageSlices/OurAchievementsSlice";

const BASE_URL = "https://htechsolution-main.onrender.com";

const OurAchievementsForm = () => {
  const dispatch = useDispatch();
  const { achievementsList, loading, error } = useSelector(
    (state) => state.ourAchievementsSection
  );

  const [editId, setEditId]     = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview]   = useState("");
  const [formData, setFormData] = useState({
    title: "",
    value: "",
    description: "",
  });

  // Fetch on mount
  useEffect(() => {
    dispatch(fetchAchievements());
  }, [dispatch]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file)); // local preview
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Use FormData for real file upload
    const data = new FormData();
    data.append("title",       formData.title);
    data.append("value",       formData.value);
    data.append("description", formData.description);
    if (imageFile) data.append("image", imageFile);

    if (editId !== null) {
      dispatch(updateAchievement({ id: editId, formData: data }));
      setEditId(null);
    } else {
      dispatch(addAchievement(data));
    }

    resetForm();
  };

  const handleEdit = (item) => {
    setEditId(item._id); // ✅ use _id
    setFormData({
      title:       item.title,
      value:       item.value,
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
    if (window.confirm("Delete this achievement?")) {
      dispatch(deleteAchievement(id)); // ✅ use _id
    }
  };

  const resetForm = () => {
    setFormData({ title: "", value: "", description: "" });
    setEditId(null);
    setImageFile(null);
    setPreview("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Our Achievements – Admin</h2>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Title (e.g. Projects Completed)"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Value (e.g. 120+)"
          value={formData.value}
          onChange={(e) => setFormData({ ...formData, value: e.target.value })}
          required
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        {/* File upload - real file not base64 */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />

        {/* Image preview */}
        {preview && (
          <img src={preview} alt="preview" className="w-12 h-12 rounded" />
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#1F6E8C] text-white px-6 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Saving..." : editId !== null ? "Update" : "Add"}
          </button>

          {editId !== null && (
            <button
              type="button"
              onClick={resetForm}
              className="text-gray-500 px-4 py-2 rounded border"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* LIST */}
      <div className="mt-8 space-y-3">
        {achievementsList.map((item) => (
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
                  alt=""
                  className="w-10 h-10 rounded object-cover"
                />
              )}
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500">{item.value}</p>
              </div>
            </div>

            <div className="space-x-3">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)} // ✅ use _id
                className="text-red-600"
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

export default OurAchievementsForm;
