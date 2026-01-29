import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAchievement,
  updateAchievement,
  deleteAchievement,
} from "../../store/HomepageSlices/OurAchievementsSlice";
 import { compressImageToBase64 } from "../../../Utils/imageToBase64";
const OurAchievementsForm = () => {
  const dispatch = useDispatch();
  const achievements = useSelector(
    (state) => state.ourAchievementsSection.achievementsList
  );

  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    value: "",
    description: "",
    iconBase64: "",
  });

  /* IMAGE → BASE64 */
 

const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // ✅ Compress before saving
  const compressedBase64 = await compressImageToBase64(file);

  setFormData({
    ...formData,
    iconBase64: compressedBase64,
  });
};


  /* SUBMIT */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      dispatch(
        updateAchievement({
          index: editIndex,
          updatedData: formData,
        })
      );
    } else {
      dispatch(addAchievement(formData));
    }

    resetForm();
  };

  /* EDIT */
  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData(achievements[index]);
  };

  /* DELETE */
  const handleDelete = (index) => {
    dispatch(deleteAchievement(index));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      value: "",
      description: "",
      iconBase64: "",
    });
    setEditIndex(null);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">
        Our Achievements – Admin
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Title (e.g. Projects Completed)"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          required
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Value (e.g. 120+)"
          value={formData.value}
          onChange={(e) =>
            setFormData({ ...formData, value: e.target.value })
          }
          required
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
        />

        <input type="file" accept="image/*" onChange={handleImageUpload} />

        {formData.iconBase64 && (
          <img
            src={formData.iconBase64}
            alt="preview"
            className="w-10 h-10"
          />
        )}

        <button className="bg-[#1F6E8C] text-white px-6 py-2 rounded">
          {editIndex !== null ? "Update" : "Add"}
        </button>

        {editIndex !== null && (
          <button
            type="button"
            onClick={resetForm}
            className="ml-4 text-gray-500"
          >
            Cancel
          </button>
        )}
      </form>

      {/* LIST */}
      <div className="mt-8 space-y-3">
        {achievements.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border p-3 rounded"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.iconBase64}
                alt=""
                className="w-8 h-8"
              />
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500">
                  {item.value}
                </p>
              </div>
            </div>

            <div className="space-x-3">
              <button
                onClick={() => handleEdit(index)}
                className="text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
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

export default OurAchievementsForm;
