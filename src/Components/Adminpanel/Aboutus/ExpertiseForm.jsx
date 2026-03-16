import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpertise,
  saveExpertise,
  updateExpertise,
  deleteExpertise,
} from "../../store/AboutUsPageSlices/OurExpertiseSlice";

const BASE_URL = "http://localhost:5000";

const ExpertiseForm = () => {
  const dispatch    = useDispatch();
  const fileInputRef = useRef(null);
  const { list: expertiseList, loading, error } = useSelector(
    (state) => state.expertise
  );

  const [editId,    setEditId]    = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [preview,   setPreview]   = useState("");
  const [form,      setForm]      = useState({
    title:   "",
    content: "",
  });

  useEffect(() => {
    dispatch(fetchExpertise());
  }, [dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      alert("Title and content are required");
      return;
    }

    const data = new FormData();
    data.append("title",   form.title);
    data.append("content", form.content);
    if (imageFile) data.append("image", imageFile);

    if (editId) {
      // ✅ Pass id and formData separately
      dispatch(updateExpertise({ id: editId, formData: data }));
    } else {
      dispatch(saveExpertise(data));
    }

    resetForm();
  };

  const handleEdit = (item) => {
    setEditId(item._id); // ✅ use _id
    setForm({
      title:   item.title,
      content: item.content,
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
    if (window.confirm("Delete this expertise?")) {
      dispatch(deleteExpertise(id)); // ✅ use _id
    }
  };

  const resetForm = () => {
    setForm({ title: "", content: "" });
    setEditId(null);
    setImageFile(null);
    setPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-4">
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>
      )}

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 p-6 bg-white rounded-lg shadow space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800">
          {editId ? "Edit Expertise" : "Add New Expertise"}
        </h2>

        <input
          type="text"
          placeholder="Expertise title"
          className="w-full border p-3 rounded-lg"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <textarea
          placeholder="Expertise description"
          className="w-full border p-3 rounded-lg"
          rows={4}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 rounded-lg"
        />

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="h-32 w-32 object-cover rounded-lg"
          />
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Saving..." : editId ? "Update" : "Add Expertise"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* LIST */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4">Existing Expertise</h3>

        {expertiseList.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No expertise added yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseList.map((item) => (
              <div
                key={item._id} // ✅ use _id
                className="border rounded-lg p-4 hover:shadow-lg transition"
              >
                {item.image && (
                  <img
                    src={
                      item.image.startsWith("http")
                        ? item.image
                        : `${BASE_URL}${item.image}`
                    }
                    alt={item.title}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                )}
                <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                  {item.content}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 bg-yellow-500 text-white py-1.5 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)} // ✅ use _id
                    className="flex-1 bg-red-500 text-white py-1.5 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertiseForm;