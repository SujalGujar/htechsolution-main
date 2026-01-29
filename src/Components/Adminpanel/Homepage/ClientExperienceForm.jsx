import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExperience,
  updateExperience,
  deleteExperience,
} from "../../store/HomepageSlices/ClientExperienceSlice";

import { compressImageToBase64 } from "../../../Utils/imageToBase64";

const ClientExperienceForm = () => {
  const dispatch = useDispatch();
  const experiences = useSelector(
    (state) => state.clientExperience.experiences
  );

  const [formData, setFormData] = useState({
    id: null,
    heading: "",
    role: "",
    description: "",
    icon: "",
  });

  /* ===============================
     Image Upload (Compressed)
  ================================ */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const compressed = await compressImageToBase64(file, 80, 0.6);

    setFormData((prev) => ({
      ...prev,
      icon: compressed,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.id) {
      dispatch(updateExperience(formData));
    } else {
      dispatch(
        addExperience({
          ...formData,
          id: Date.now(),
        })
      );
    }

    setFormData({
      id: null,
      heading: "",
      role: "",
      description: "",
      icon: "",
    });
  };

  return (
    <div className="max-w-xl bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">
        Client Experience Manager
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Client Name / Heading"
          value={formData.heading}
          onChange={(e) =>
            setFormData({ ...formData, heading: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Client Role / Company"
          value={formData.role}
          onChange={(e) =>
            setFormData({ ...formData, role: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Experience Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
          className="w-full border p-2 rounded"
        />

        <input type="file" accept="image/*" onChange={handleImageUpload} />

        {formData.icon && (
          <img src={formData.icon} className="w-12 h-12" alt="preview" />
        )}

        <button className="bg-[#1F6E8C] text-white px-4 py-2 rounded">
          {formData.id ? "Update Experience" : "Add Experience"}
        </button>
      </form>

      
      <div className="mt-6 space-y-3">
        {experiences.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border p-3 rounded"
          >
            <span>{item.heading}</span>

            <div className="space-x-2">
              <button
                onClick={() => setFormData(item)}
                className="text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteExperience(item.id))}
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

export default ClientExperienceForm;
