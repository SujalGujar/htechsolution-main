import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, saveBlog, deleteBlog } from "../../store/Blogs/BlogHeroSlice";

const BlogHeroAdmin = () => {
  const dispatch = useDispatch();

  // ✅ FIXED SELECTOR
  const { blogs = [] } = useSelector((state) => state.blogHero || {});

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    dispatch(saveBlog(formData));

    setTitle("");
    setContent("");
    setImage(null);
  };

  return (
    <div className="p-6 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Heading"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button className="bg-black text-white px-6 py-2">
          Add Blog
        </button>
      </form>

      {/* LIST */}
      {blogs.map((b) => (
        <div key={b.id} className="border p-4 flex justify-between">
          <h3>{b.title}</h3>
          <button
            className="text-red-500"
            onClick={() => dispatch(deleteBlog(b.id))}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default BlogHeroAdmin;
