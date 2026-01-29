import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addService,
  updateService,
  deleteService,
} from "../../store/AboutUsPageSlices/OurServicesSlice";

import { compressImageToBase64 } from "../../../Utils/imageToBase64";

const ServiceForm = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.ourServices.services);

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    icon: "",
  });

  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✅ Compress BEFORE saving
    const compressedBase64 = await compressImageToBase64(
      file,
      100, // icon size
      0.6  // quality
    );

    setFormData((prev) => ({
      ...prev,
      icon: compressedBase64,
    }));
  };

  /* ===============================
     SUBMIT
  ================================ */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.icon) {
      alert("Please upload icon");
      return;
    }

    if (formData.id) {
      dispatch(updateService(formData));
    } else {
      dispatch(
        addService({
          ...formData,
          id: Date.now(),
        })
      );
    }

    setFormData({
      id: null,
      title: "",
      description: "",
      icon: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-2xl">
      <h2 className="text-xl font-bold mb-4">Manage Services</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Service Heading"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Service Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />

        {formData.icon && (
          <img
            src={formData.icon}
            className="w-12 h-12"
            alt="Preview"
          />
        )}

        <button className="bg-[#1F6E8C] text-white px-4 py-2 rounded">
          {formData.id ? "Update Service" : "Add Service"}
        </button>
      </form>

      {/* ===== LIST ===== */}
      <div className="mt-6 space-y-3">
        {services.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border p-3 rounded"
          >
            <span>{item.title}</span>

            <div className="space-x-2">
              <button
                onClick={() => setFormData(item)}
                className="text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteService(item.id))}
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

export default ServiceForm;
