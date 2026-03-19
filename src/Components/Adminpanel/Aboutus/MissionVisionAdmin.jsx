import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSections,
  saveSection,
  deleteSection,
} from "../../store/AboutUsPageSlices/VisionMisionSlice";

const BASE_URL  = "https://htechsolution-main.onrender.com";
const EMPTY_FORM = { id: "", title: "", content: "" };

const MissionVisionAdmin = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.sections);

  const [form,      setForm]      = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [preview,   setPreview]   = useState("");

  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.content) {
      alert("Title and content are required");
      return;
    }

    const data = new FormData();
    data.append("id",      form.id);
    data.append("title",   form.title);
    data.append("content", form.content);
    if (imageFile) data.append("image", imageFile);

    dispatch(saveSection(data));
    resetForm();
  };

  const handleEdit = (item) => {
    // ✅ Use _id
    setForm({
      id:      item._id,
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
    if (window.confirm("Delete this section?")) {
      dispatch(deleteSection(id));
    }
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setImageFile(null);
    setPreview("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-[#1F6E8C]">
        Mission & Vision Admin
      </h2>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>
      )}

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 mb-8 p-4 border rounded-lg"
      >
        <h3 className="text-lg font-semibold">
          {form.id ? "Edit Section" : "Add New Section"}
        </h3>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="E.g., Our Mission, Our Vision"
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Enter content..."
          rows="4"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="w-full border p-2 rounded"
        />

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="h-24 w-auto rounded object-cover"
          />
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-[#1F6E8C] text-white rounded disabled:opacity-50"
          >
            {loading ? "Saving..." : form.id ? "Update" : "Save"}
          </button>
          {form.id && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* LIST */}
      <h3 className="text-xl font-bold mb-4">Existing Sections</h3>

      {list.length === 0 ? (
        <p className="text-gray-500 italic">No sections added yet.</p>
      ) : (
        <div className="space-y-4">
          {list.map((item) => (
            <div
              key={item._id} // ✅ use _id
              className="flex flex-col md:flex-row md:items-center justify-between border p-4 rounded-lg hover:bg-gray-50"
            >
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.content}</p>
                {item.image && (
                  <img
                    src={
                      item.image.startsWith("http")
                        ? item.image
                        : `${BASE_URL}${item.image}`
                    }
                    alt={item.title}
                    className="h-16 w-auto rounded mt-2"
                  />
                )}
              </div>

              <div className="flex gap-2 mt-3 md:mt-0">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)} // ✅ use _id
                  className="px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MissionVisionAdmin;
