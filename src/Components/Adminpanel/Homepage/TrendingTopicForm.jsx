import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTrending,
  addTrending,
  deleteTrending,
  autoDeleteExpired,
} from "../../store/HomepageSlices/TrendingTopicSlice";

const TrendingTopicForm = () => {
  const dispatch = useDispatch();
  const { list: topics, loading } = useSelector(state => state.trending);

  const [form, setForm] = useState({
    id: "",
    title: "",
    content: "",
    startTime: "",
    endTime: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        await dispatch(fetchTrending()).unwrap();
        // Clean up expired items on mount
        dispatch(autoDeleteExpired());
      } catch (error) {
        console.error("Failed to load trending topics:", error);
      }
    };

    initializeData();
  }, [dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      alert("Please fill in title and content");
      return;
    }

    const fd = new FormData();
    Object.keys(form).forEach(k => {
      if (form[k]) fd.append(k, form[k]);
    });
    fd.append("type", "trending");
    if (image) fd.append("image", image);

    try {
      await dispatch(addTrending(fd)).unwrap();
      await dispatch(fetchTrending()).unwrap();
      
      // Reset form
      setForm({
        id: "",
        title: "",
        content: "",
        startTime: "",
        endTime: "",
      });
      setImage(null);
      setImagePreview(null);
      
      // Clear file input
      e.target.querySelector('input[type="file"]').value = "";
      
    } catch (error) {
      console.error("Failed to save trending topic:", error);
      alert("Failed to save. Please check your backend server.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this trending topic?")) {
      try {
        await dispatch(deleteTrending(id)).unwrap();
      } catch (error) {
        console.error("Failed to delete:", error);
        alert("Failed to delete. Please try again.");
      }
    }
  };

  const now = new Date().toISOString().slice(0, 16);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Trending Topics</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8 p-4 border rounded-lg bg-gray-50">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter trending title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content *
          </label>
          <textarea
            className="border border-gray-300 rounded-lg p-3 w-full h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter trending content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date & Time
            </label>
            <input
              type="datetime-local"
              min={now}
              className="border border-gray-300 rounded-lg p-3 w-full"
              value={form.startTime}
              onChange={(e) => setForm({ ...form, startTime: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date & Time
            </label>
            <input
              type="datetime-local"
              min={form.startTime || now}
              className="border border-gray-300 rounded-lg p-3 w-full"
              value={form.endTime}
              onChange={(e) => setForm({ ...form, endTime: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image (Optional)
          </label>
          <input 
            type="file" 
            accept="image/*"
            onChange={handleImageChange}
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
          {imagePreview && (
            <div className="mt-2">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-32 h-32 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition duration-200"
          disabled={loading}
        >
          {loading ? "Saving..." : (form.id ? "Update" : "Publish")} Trending Topic
        </button>
      </form>

      {/* Active Topics List */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Active Trending Topics ({topics.length})
          </h3>
          <button
            onClick={() => dispatch(autoDeleteExpired())}
            className="text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
          >
            Clean Expired
          </button>
        </div>

        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : topics.length === 0 ? (
          <div className="text-center py-8 text-gray-500 border rounded-lg">
            No trending topics yet. Create one above!
          </div>
        ) : (
          <div className="space-y-4">
            {topics.map(t => {
              const isActive = new Date(t.startTime || 0) <= new Date() && 
                              new Date(t.endTime || "9999-12-31") >= new Date();
              const isExpired = t.endTime && new Date(t.endTime) < new Date();

              return (
                <div
                  key={t.id}
                  className={`border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center ${
                    isExpired ? 'bg-red-50 border-red-200' : 
                    isActive ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-800">{t.title}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        isExpired ? 'bg-red-100 text-red-800' :
                        isActive ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {isExpired ? 'Expired' : isActive ? 'Active' : 'Scheduled'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{t.content}</p>
                    <p className="text-xs text-gray-500">
                      {t.startTime ? `Starts: ${new Date(t.startTime).toLocaleString()}` : 'No start time'}
                      {t.endTime ? ` → Ends: ${new Date(t.endTime).toLocaleString()}` : ''}
                    </p>
                    {t.image && (
                      <div className="mt-2">
                        <img 
                          src={`http://localhost:5000${t.image}`} 
                          alt={t.title}
                          className="w-24 h-16 object-cover rounded border"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mt-3 md:mt-0">
                    <button
                      className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded text-sm"
                      onClick={() => {
                        setForm(t);
                        setImagePreview(t.image ? `http://localhost:5000${t.image}` : null);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded text-sm"
                      onClick={() => handleDelete(t.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingTopicForm;