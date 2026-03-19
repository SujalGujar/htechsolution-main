import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSections,
  saveSection,
  updateSection,
  deleteSection,
} from "../../store/Blogs/BlogsSlice";

const BASE_URL   = "https://htechsolution-main.onrender.com";
const EMPTY_FORM = { title: "", content: "" };

const BlogsAdmin = () => {
  const dispatch = useDispatch();
  const { gallerySections, loading, error } = useSelector(
    (state) => state.blogGallery
  );

  const [editId,      setEditId]      = useState(null);
  const [form,        setForm]        = useState(EMPTY_FORM);
  const [imageFile,   setImageFile]   = useState(null);
  const [videoFile,   setVideoFile]   = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [videoPreview, setVideoPreview] = useState("");

  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

  // ✅ Handle image selection
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    // Clear video if image selected
    setVideoFile(null);
    setVideoPreview("");
  };

  // ✅ Handle video selection
  const handleVideo = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
    // Clear image if video selected
    setImageFile(null);
    setImagePreview("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.content) {
      alert("Title and content are required");
      return;
    }

    const fd = new FormData();
    fd.append("title",   form.title);
    fd.append("content", form.content);
    if (imageFile) fd.append("image", imageFile);
    if (videoFile) fd.append("video", videoFile);

    if (editId) {
      dispatch(updateSection({ id: editId, formData: fd }));
      setEditId(null);
    } else {
      dispatch(saveSection(fd));
    }

    resetForm();
  };

  const handleEdit = (item) => {
    setEditId(item._id); // ✅ use _id
    setForm({
      title:   item.title,
      content: item.content,
    });
    // Show existing media
    if (item.mediaType === "image" && item.image) {
      setImagePreview(
        item.image.startsWith("http") ? item.image : `${BASE_URL}${item.image}`
      );
    }
    if (item.mediaType === "video" && item.video) {
      setVideoPreview(
        item.video.startsWith("http") ? item.video : `${BASE_URL}${item.video}`
      );
    }
    setImageFile(null);
    setVideoFile(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this blog?")) {
      dispatch(deleteSection(id)); // ✅ use _id
    }
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setImageFile(null);
    setVideoFile(null);
    setImagePreview("");
    setVideoPreview("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Manage Blogs</h2>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          className="w-full border p-2 rounded"
          placeholder="Title *"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Content *"
          rows={4}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />

        {/* ✅ Image Upload */}
        <div className="border rounded p-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image (JPG, PNG, WEBP)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              className="mt-3 w-full h-40 object-cover rounded"
            />
          )}
        </div>

        {/* ✅ Video Upload */}
        <div className="border rounded p-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Video (MP4, WEBM)
          </label>
          <input
            type="file"
            accept="video/mp4,video/webm,video/ogg"
            onChange={handleVideo}
            className="w-full"
          />
          {videoPreview && (
            <video
              src={videoPreview}
              controls
              className="mt-3 w-full h-40 rounded"
            />
          )}
        </div>

        <p className="text-xs text-gray-400">
          * Upload either an image OR a video — not both
        </p>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-6 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Saving..." : editId ? "Update Blog" : "Add Blog"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* LIST */}
      <div className="space-y-3">
        {gallerySections.length === 0 && (
          <p className="text-gray-500">No blogs added yet.</p>
        )}
        {gallerySections.map((b) => (
          <div
            key={b._id} // ✅ use _id
            className="flex justify-between items-center border p-3 rounded"
          >
            <div className="flex items-center gap-3">
              {/* ✅ Show image or video thumbnail */}
              {b.mediaType === "image" && b.image && (
                <img
                  src={
                    b.image.startsWith("http")
                      ? b.image
                      : `${BASE_URL}${b.image}`
                  }
                  alt={b.title}
                  className="w-16 h-12 object-cover rounded"
                />
              )}
              {b.mediaType === "video" && b.video && (
                <div className="w-16 h-12 bg-gray-800 rounded flex items-center justify-center">
                  <span className="text-white text-xs">▶ Video</span>
                </div>
              )}
              <div>
                <p className="font-semibold">{b.title}</p>
                <p className="text-xs text-gray-400 capitalize">
                  {b.mediaType !== "none" ? `📎 ${b.mediaType}` : "No media"}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(b)}
                className="text-blue-600 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(b._id)} // ✅ use _id
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

export default BlogsAdmin;
