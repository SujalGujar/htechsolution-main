import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAboutUs,
  addAboutUs,
  updateAboutUs,
  deleteAboutUs,
} from "../../store/HomepageSlices/AboutUsSlice";

// ✅ Removed convertToBase64 - using real file now
const BASE_URL = "http://localhost:5000";

const AboutUsHome = () => {
  const dispatch = useDispatch();
  const { aboutUsList, status } = useSelector(
    (state) => state.aboutUsSection
  );

  const [editId,    setEditId]    = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [preview,   setPreview]   = useState("");
  const [formData,  setFormData]  = useState({
    heading:     "",
    description: "",
    features:    "",
  });

  useEffect(() => {
    dispatch(fetchAboutUs());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Real file - not base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Use FormData for real file upload
    const data = new FormData();
    data.append("heading",     formData.heading);
    data.append("description", formData.description);
    // Send features as JSON string
    data.append(
      "features",
      JSON.stringify(
        formData.features.split(",").map((f) => f.trim()).filter(Boolean)
      )
    );
    if (imageFile) data.append("image", imageFile);

    if (editId !== null) {
      dispatch(updateAboutUs({ id: editId, formData: data }));
      setEditId(null);
    } else {
      dispatch(addAboutUs(data));
    }

    resetForm();
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setFormData({
      heading:     item.heading,
      description: item.description,
      features:    item.features?.join(", ") || "",
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
    if (window.confirm("Delete this entry?")) {
      dispatch(deleteAboutUs(id));
    }
  };

  const resetForm = () => {
    setFormData({ heading: "", description: "", features: "" });
    setEditId(null);
    setImageFile(null);
    setPreview("");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">About Us Section Admin</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        {/* ✅ Real file input */}
        <input
          type="file"
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
          placeholder="Heading"
          className="border p-2 w-full rounded"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows="3"
          className="border p-2 w-full rounded"
          required
        />

        <input
          type="text"
          name="features"
          value={formData.features}
          onChange={handleChange}
          placeholder="Features (comma separated e.g. Fast, Reliable, Secure)"
          className="border p-2 w-full rounded"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={status === "loading"}
            className={`px-6 py-2 rounded text-white disabled:opacity-50 ${
              editId !== null ? "bg-green-600" : "bg-blue-600"
            }`}
          >
            {status === "loading"
              ? "Saving..."
              : editId !== null
              ? "Update"
              : "Add"}
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
      <h3 className="text-xl font-semibold mb-4">About Us Content List</h3>

      {aboutUsList.length === 0 && (
        <p className="text-gray-500">No content added yet.</p>
      )}

      {aboutUsList.map((item) => (
        <div
          key={item._id}
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
                alt="About"
                className="w-32 h-20 object-cover mb-2 rounded"
              />
            )}
            <h4 className="font-semibold">{item.heading}</h4>
            <p className="text-sm text-gray-600">{item.description}</p>
            <ul className="list-disc ml-5 text-sm mt-2">
              {item.features?.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="space-x-2 flex items-start">
            <button
              onClick={() => handleEdit(item)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutUsHome;