import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSections,
  saveSection,
  deleteSection,
} from "../../store/Blogs/BlogsSlice";

const EMPTY = {
  id: "",
  title: "",
  content: "",
  image: "",
};

const BlogsAdmin = () => {
  const dispatch = useDispatch();

  const { gallerySections = [], loading } = useSelector(
    (state) => state.blogGallery
  );

  const [form, setForm] = useState(EMPTY);
  const [file, setFile] = useState(null);

  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

  const submit = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("id", form.id);
    fd.append("title", form.title);
    fd.append("content", form.content);
    if (file) fd.append("image", file);
    else if (form.image) fd.append("image", form.image);

    dispatch(saveSection(fd));
    setForm(EMPTY);
    setFile(null);
  };

  const edit = (item) => {
    setForm(item);
    setFile(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Manage Blogs</h2>

      <form onSubmit={submit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Content"
          rows={4}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button className="px-4 py-2 bg-black text-white rounded">
          {form.id ? "Update" : "Add"} Blog
        </button>
      </form>

      <div className="mt-6 space-y-3">
        {gallerySections.map((b) => (
          <div
            key={b.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <div>
              <div className="font-semibold">{b.title}</div>
              <div className="text-sm">{b.content.slice(0, 40)}...</div>
            </div>

            <div className="space-x-3">
              <button
                onClick={() => edit(b)}
                className="text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteSection(b.id))}
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

export default BlogsAdmin;
