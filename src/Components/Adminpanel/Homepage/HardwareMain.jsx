import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import {
  addSolution,
  updateSolution,
  deleteSolution,
} from "../../store/HomepageSlices/HardwareSlice";


const EMPTY_FORM = {
  title: "",
  description: "",
  image: "",
};

const HardwareMain = () => {
  const dispatch = useDispatch();
  const solutions = useSelector(
    (state) => state.softwareSolutions.solutions
  );

  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({ ...EMPTY_FORM });

  // INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // IMAGE
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

   
    const payload = {
      title: formData.title,
      description: formData.description,
      image: formData.image,
    };

    if (editIndex === null) {
      
      dispatch(addSolution(payload));
    } else {
      
      dispatch(updateSolution({ index: editIndex, updatedData: payload }));
    }

    
    setEditIndex(null);
    setFormData({ ...EMPTY_FORM });

    
    e.target.reset();
  };

  // EDIT
  const handleEdit = (item, index) => {
    setEditIndex(index);
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image,
    });
  };

  // DELETE
  const handleDelete = (index) => {
    dispatch(deleteSolution(index));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Admin – Software Solutions
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow mb-10"
      >
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 w-full mb-3"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full mb-3"
          required
        />

        <input type="file" accept="image/*" onChange={handleImageUpload} />

        {formData.image && (
          <img
            src={formData.image}
            alt="preview"
            className="w-24 mt-3"
          />
        )}

        <button className="bg-blue-600 text-white px-6 py-2 mt-4 rounded">
          {editIndex === null ? "Add Solution" : "Update Solution"}
        </button>
      </form>

      {/* LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {solutions.map((item, index) => (
          <div key={index} className="bg-white p-4 shadow rounded">
            <img
              src={item.image}
              alt={item.title}
              className="h-40 w-full object-cover"
            />
            <h3 className="font-bold mt-2">{item.title}</h3>
            <p className="text-sm">{item.description}</p>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => handleEdit(item, index)}
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

export default HardwareMain;
