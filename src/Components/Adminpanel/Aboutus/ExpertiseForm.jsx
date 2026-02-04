import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveExpertise, fetchExpertise, deleteExpertise, updateExpertise } from "../../store/AboutUsPageSlices/OurExpertiseSlice";

const ExpertiseForm = () => {
  const dispatch = useDispatch();
  const { list: expertiseList, loading } = useSelector((state) => state.expertise);
  
  const [form, setForm] = useState({
    id: null,
    title: "",
    content: "",
    image: null,
    imagePreview: null,
    imageUrl: ""
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    dispatch(fetchExpertise());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!form.title.trim() || !form.content.trim()) {
      alert("Title and Content are required");
      return;
    }

    const data = new FormData();
    data.append("title", form.title);
    data.append("content", form.content);
    data.append("type", "expertise");
    
    if (form.image) {
      data.append("image", form.image);
    }
    
    if (isEditing && form.id) {
      // Append the ID for update
      data.append("id", form.id);
      
      // If editing and has existing image but no new image, send the existing image URL
      if (!form.image && form.imageUrl) {
        data.append("imageUrl", form.imageUrl);
      }
      
      // Update existing expertise
      dispatch(updateExpertise(data)).then(() => {
        dispatch(fetchExpertise());
        resetForm();
      });
    } else {
      // Create new expertise
      dispatch(saveExpertise(data)).then(() => {
        dispatch(fetchExpertise());
        resetForm();
      });
    }
  };

  const handleEdit = (expertise) => {
    setForm({
      id: expertise.id,
      title: expertise.title,
      content: expertise.content,
      image: null,
      imagePreview: expertise.image ? `http://localhost:5000/uploads/${expertise.image}` : null,
      imageUrl: expertise.image || ""
    });
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expertise?")) {
      dispatch(deleteExpertise(id)).then(() => {
        dispatch(fetchExpertise());
        if (isEditing && form.id === id) {
          resetForm();
        }
      });
    }
  };

  const resetForm = () => {
    setForm({
      id: null,
      title: "",
      content: "",
      image: null,
      imagePreview: null,
      imageUrl: ""
    });
    setIsEditing(false);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {isEditing ? "Edit Expertise" : "Add New Expertise"}
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            placeholder="Enter expertise title"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            placeholder="Enter expertise description"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          
          {form.imagePreview && (
            <div className="mt-2">
              <img 
                src={form.imagePreview} 
                alt="Preview" 
                className="h-32 w-32 object-cover rounded-lg"
              />
            </div>
          )}
          
          {isEditing && !form.imagePreview && form.imageUrl && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Current Image:</p>
              <img 
                src={`http://localhost:5000/uploads/${form.imageUrl}`} 
                alt="Current" 
                className="h-32 w-32 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="flex space-x-3 pt-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition duration-200"
            disabled={loading}
          >
            {loading ? "Processing..." : (isEditing ? "Update Expertise" : "Add Expertise")}
          </button>
          
          {isEditing && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg font-medium transition duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Expertise List with Edit/Delete */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Existing Expertise Items</h3>
        
        {loading ? (
          <p className="text-center py-4">Loading...</p>
        ) : expertiseList.length === 0 ? (
          <p className="text-center py-4 text-gray-500">No expertise items found. Add one above.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseList.map((expertise) => (
              <div key={expertise.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
                {expertise.image && (
                  <img 
                    src={`http://localhost:5000/uploads/${expertise.image}`}
                    alt={expertise.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h4 className="font-bold text-lg text-gray-800 mb-2">{expertise.title}</h4>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{expertise.content}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(expertise)}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(expertise.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium"
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