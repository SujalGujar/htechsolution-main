import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSections,
  saveSection,
  deleteSection,
} from "../../store/AboutUsPageSlices/VisionMisionSlice";

const EMPTY_FORM = {
  id: "",
  title: "",
  content: "",
  image: null,
};

const MissionVisionAdmin = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.sections);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!form.title || !form.content) {
      alert("Please fill all required fields: Title and Content");
      return;
    }

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key] !== null && form[key] !== "") {
        data.append(key, form[key]);
      }
    });

    dispatch(saveSection(data));
    setForm(EMPTY_FORM);
  };

  const handleEdit = (section) => {
    setForm(section);
  };

  const handleCancel = () => {
    setForm(EMPTY_FORM);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Mission & Vision Admin</h2>
        <p className="text-gray-600">Loading sections...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Mission & Vision Admin</h2>
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Mission & Vision Admin</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-2">
          {form.id ? "Edit Section" : "Add New Section"}
        </h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="E.g., Our Mission, Our Vision"
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content *
          </label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Enter the content for this section..."
            rows="4"
            className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image (Optional)
          </label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            accept="image/*"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-6 py-2 bg-[#1F6E8C] text-white rounded hover:bg-[#16556e] transition-colors"
          >
            {form.id ? "Update Section" : "Save Section"}
          </button>
          {form.id && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* LIST */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Existing Sections</h3>
        
        {!list || list.length === 0 ? (
          <p className="text-gray-600 italic">No sections added yet.</p>
        ) : (
          <div className="space-y-4">
            {Array.isArray(list) && list.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:items-center justify-between border p-4 rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{item.content}</p>
                  {item.image && (
                    <div className="mt-2">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="h-20 w-auto object-cover rounded"
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 mt-4 md:mt-0">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
                        dispatch(deleteSection(item.id));
                      }
                    }}
                    className="px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors"
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

export default MissionVisionAdmin;