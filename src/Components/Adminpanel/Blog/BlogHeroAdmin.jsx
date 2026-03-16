import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogs,
  saveBlog,
  deleteBlog,
} from "../../store/Blogs/BlogHeroSlice";

const BASE_URL = "http://localhost:5000";

const BlogHeroAdmin = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector(
    (state) => state.blogHero
  );

  const [title,   setTitle]   = useState("");
  const [content, setContent] = useState("");
  const [image,   setImage]   = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Title and content are required");
      return;
    }

    const data = new FormData();
    data.append("title",   title);
    data.append("content", content);
    if (image) data.append("image", image);

    dispatch(saveBlog(data));

    // Reset form
    setTitle("");
    setContent("");
    setImage(null);
    setPreview("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this blog?")) {
      dispatch(deleteBlog(id));
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Blog Hero Admin</h2>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded">{error}</div>
      )}

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        <input
          className="border p-2 w-full rounded"
          placeholder="Heading *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="border p-2 w-full rounded"
          placeholder="Description *"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="border p-2 w-full rounded"
        />

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-full h-40 object-cover rounded"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Blog"}
        </button>
      </form>

      {/* LIST */}
      <div className="space-y-3">
        {blogs.length === 0 && (
          <p className="text-gray-500">No blogs added yet.</p>
        )}
        {blogs.map((b) => (
          <div
            key={b._id} // ✅ use _id
            className="border p-4 flex items-center justify-between rounded bg-white"
          >
            <div className="flex items-center gap-3">
              {b.image && (
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
              <div>
                <h3 className="font-semibold">{b.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-1">
                  {b.content}
                </p>
              </div>
            </div>
            <button
              className="text-red-500 hover:text-red-700 font-medium"
              onClick={() => handleDelete(b._id)} // ✅ use _id
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogHeroAdmin;