import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAboutUs,
  updateAboutUs,
  deleteAboutUs,
} from "../../store/HomepageSlices/AboutUsSlice";

/* Convert image to base64 */
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const AboutUsHome = () => {
  const dispatch = useDispatch();

  
  const aboutUsList = useSelector(
    (state) => state.aboutUsSection.aboutUsList
  );

  const [formData, setFormData] = useState({
    image: "",
    heading: "",
    description: "",
    features: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  /* HANDLE INPUT */
  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const base64 = await convertToBase64(files[0]);
      setFormData({ ...formData, image: base64 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  /* SUBMIT */
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      image: formData.image,
      heading: formData.heading,
      description: formData.description,
      features: formData.features.split(",").map((f) => f.trim()),
    };

    if (editIndex !== null) {
      dispatch(updateAboutUs({ index: editIndex, updatedData: payload }));
      setEditIndex(null);
    } else {
      dispatch(addAboutUs(payload));
    }

    setFormData({
      image: "",
      heading: "",
      description: "",
      features: "",
    });
  };

  /* EDIT */
  const handleEdit = (index) => {
    const item = aboutUsList[index];
    setFormData({
      image: item.image,
      heading: item.heading,
      description: item.description,
      features: item.features.join(", "),
    });
    setEditIndex(index);
  };

  /* DELETE */
  const handleDelete = (index) => {
    dispatch(deleteAboutUs(index));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">
        About Us Section Admin
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
          placeholder="Heading"
          className="border p-2 w-full rounded"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows="3"
          className="border p-2 w-full rounded"
          required
        />

        <input
          type="text"
          name="features"
          value={formData.features}
          onChange={handleChange}
          placeholder="Features (comma separated)"
          className="border p-2 w-full rounded"
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
      <h3 className="text-xl font-semibold mb-4">
        About Us Content List
      </h3>

      {aboutUsList.length === 0 && (
        <p className="text-gray-500">No content added yet.</p>
      )}

      {aboutUsList.map((item, index) => (
        <div
          key={index}
          className="border p-4 rounded mb-4 flex justify-between"
        >
          <div>
            {item.image && (
              <img
                src={item.image}
                alt="About"
                className="w-32 h-20 object-cover mb-2 rounded"
              />
            )}
            <h4 className="font-semibold">{item.heading}</h4>
            <p className="text-sm text-gray-600">{item.description}</p>

            <ul className="list-disc ml-5 text-sm mt-2">
              {item.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
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
  );
};

export default AboutUsHome;
