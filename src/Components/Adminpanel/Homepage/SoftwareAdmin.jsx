import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProject, updateProject, deleteProject } from "../../store/HomepageSlices/SoftwareProjectSlice"; // adjust path

const SoftwareAdmin = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.list);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([""]);
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Feature handling
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addFeature = () => setFeatures([...features, ""]);

  // Image upload
  const handleImage = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 400; // reduce width
        const scale = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressed = canvas.toDataURL("image/jpeg", 0.7); // compress
        setImage(compressed); // store smaller Base64
      };
    };
    reader.readAsDataURL(file);
  }
};

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const projectData = {
      title,
      description,
      features,
      image,
      gradient: "linear-gradient(135deg, #1F6E8C 0%, #6BA368 50%, #D4A017 100%)",
    };

    if (editingId) {
      dispatch(updateProject({ id: editingId, updatedProject: projectData }));
      setEditingId(null);
    } else {
      dispatch(addProject({ ...projectData, id: Date.now() }));
    }

    // Reset form
    setTitle("");
    setDescription("");
    setFeatures([""]);
    setImage(null);
  };

  // Edit project
  const handleEdit = (project) => {
    setEditingId(project.id);
    setTitle(project.title);
    setDescription(project.description);
    setFeatures(project.features || [""]);
    setImage(project.image || null);
  };

  // Delete project
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      dispatch(deleteProject(id));
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow mb-6">
        <h2 className="text-2xl font-bold mb-4">
          {editingId ? "Edit Project" : "Add New Project"}
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          required
        />

        <div className="mb-2">
          {features.map((feature, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={`Feature ${idx + 1}`}
              value={feature}
              onChange={(e) => handleFeatureChange(idx, e.target.value)}
              className="w-full mb-1 p-2 border rounded"
              required
            />
          ))}
          <button type="button" onClick={addFeature} className="text-blue-600 text-sm">
            + Add Feature
          </button>
        </div>

        <input type="file" accept="image/*" onChange={handleImage} className="mb-4" />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? "Update Project" : "Add Project"}
        </button>
      </form>

      {/* Display all projects */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-4 border rounded flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-center gap-4">
              {project.image && (
                <img src={project.image} alt={project.title} className="w-20 h-20 object-cover rounded" />
              )}
              <div>
                <h3 className="font-bold">{project.title}</h3>
                <p className="text-sm">{project.description}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-2 md:mt-0">
              <button
                onClick={() => handleEdit(project)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
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

export default SoftwareAdmin;
