import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeliverables,
  saveDeliverable,
  deleteDeliverable,
} from "../../store/HomepageSlices/ProjectDeliverableSlice";

const ProjectDeliverableForm = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.projectDeliverables);

  const [form, setForm] = useState({
    id: "",
    title: "",
    review: "",
    methodology: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    dispatch(fetchDeliverables());
  }, [dispatch]);

  const submit = () => {
    if (!form.title || !form.review || !form.methodology) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("id", form.id);
    formData.append("title", form.title);
    formData.append("review", form.review);
    formData.append("methodology", form.methodology);
    if (image) formData.append("image", image);

    dispatch(saveDeliverable(formData)).then(() => {
      dispatch(fetchDeliverables());
    });

    setForm({ id: "", title: "", review: "", methodology: "" });
    setImage(null);
  };

  const editDeliverable = (d) => {
    setForm({
      id: d.id,
      title: d.title,
      review: d.review,
      methodology: d.methodology,
    });
    setImage(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this deliverable?")) {
      dispatch(deleteDeliverable(id)).then(() => dispatch(fetchDeliverables()));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-800">
        Project Deliverables
      </h2>

      {/* FORM */}
      <div className="grid gap-4 mb-4">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          placeholder="Client Review"
          value={form.review}
          onChange={(e) => setForm({ ...form, review: e.target.value })}
          className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          placeholder="Methodology"
          value={form.methodology}
          onChange={(e) => setForm({ ...form, methodology: e.target.value })}
          className="border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 rounded-lg"
        />
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            className="w-32 h-32 object-cover rounded-lg mt-2 shadow-md"
          />
        )}
      </div>

      <button
        onClick={submit}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold"
      >
        {form.id ? "Update Deliverable" : "Add Deliverable"}
      </button>

      <hr className="my-6 border-gray-300" />

      {/* DELIVERABLE LIST */}
      <div className="space-y-4">
        {list.length === 0 && (
          <p className="text-gray-500 text-center">No deliverables added yet.</p>
        )}

        {list.map((d) => (
          <div
            key={d.id}
            className="flex flex-col md:flex-row md:justify-between items-start md:items-center bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="flex items-center space-x-4">
              <img
                src={d.image ? `http://localhost:5000${d.image}` : "/placeholder.png"}
                alt={d.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h4 className="font-semibold text-lg">{d.title}</h4>
                <p className="text-gray-600">{d.review}</p>
                <span className="text-gray-500 text-sm italic">{d.methodology}</span>
              </div>
            </div>
            <div className="flex space-x-2 mt-2 md:mt-0">
              <button
                onClick={() => editDeliverable(d)}
                className="bg-yellow-400 hover:bg-yellow-500 px-4 py-1 rounded font-semibold"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(d.id)}
                className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-white font-semibold"
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

export default ProjectDeliverableForm;
