import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addHeroSection,
  updateHeroSection,
  deleteHeroSection,
} from "../../store/HomepageSlices/HeroSectionSlice";
  
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

  


const HeroSectionAdmin = () => {
  const dispatch = useDispatch();
  const heroList = useSelector((state) => state.heroSection.heroList);
 
  const [formData, setFormData] = useState({
    image: "",
    heading: "",
    description: "",
  });
   

  const [editIndex, setEditIndex] = useState(null);

  
  const handleChange = async (e) => {
  const { name, value, files } = e.target;

  if (name === "image") {
    const base64Image = await convertToBase64(files[0]);
    setFormData({ ...formData, image: base64Image });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};


  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      dispatch(
        updateHeroSection({
          index: editIndex,
          updatedData: formData,
        })
      );
      setEditIndex(null);
    } else {
      dispatch(addHeroSection(formData));
    }

    setFormData({
      image: "",
      heading: "",
      description: "",
    });
  };

  // EDIT
  const handleEdit = (index) => {
    setFormData(heroList[index]);
    setEditIndex(index);
  };

  // DELETE
  const handleDelete = (index) => {
    dispatch(deleteHeroSection(index));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">
        Hero Section Admin
      </h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <input
          type="text"
          name="heading"
          value={formData.heading}
          onChange={handleChange}
          placeholder="Hero Heading"
          className="border p-2 w-full rounded"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Hero Description"
          rows="3"
          className="border p-2 w-full rounded"
          required
        />

        <button
          type="submit"
          className={`px-6 py-2 rounded text-white ${
            editIndex !== null ? "bg-green-600" : "bg-blue-600"
          }`}
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </form>

      {/* LIST */}
      <div>
        <h3 className="text-xl font-semibold mb-4">
          Hero Content List
        </h3>

        {heroList.length === 0 && (
          <p className="text-gray-500">
            No hero content added yet.
          </p>
        )}

        {heroList.map((item, index) => (
          <div
            key={index}
            className="border p-4 rounded mb-4 flex justify-between"
          >
            <div>
              {item.image && (
                <img
                  src={item.image}
                  alt="Hero"
                  className="w-32 h-20 object-cover mb-2 rounded"
                />
              )}
              <h4 className="font-semibold">{item.heading}</h4>
              <p className="text-sm text-gray-600">
                {item.description}
              </p>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => handleEdit(index)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-600 text-white px-3 py-1 rounded"
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

export default HeroSectionAdmin;
