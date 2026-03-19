import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTeam,
  saveTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../../store/AboutUsPageSlices/TeamAdminSlice";

const BASE_URL   = "https://htechsolution-main.onrender.com";
const EMPTY_FORM = {
  name:        "",
  designation: "",
  description: "",
  linkedin:    "",
  email:       "",
};

const TeamAdmin = () => {
  const dispatch = useDispatch();
  const { members, loading, error } = useSelector(
    (state) => state.ourTeam
  );

  const [editId,    setEditId]    = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [preview,   setPreview]   = useState("");
  const [form,      setForm]      = useState(EMPTY_FORM);

  useEffect(() => {
    dispatch(fetchTeam());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.designation) {
      alert("Name and designation are required");
      return;
    }

    // ✅ Use FormData for real file upload
    const data = new FormData();
    data.append("name",        form.name);
    data.append("designation", form.designation);
    data.append("description", form.description);
    data.append("linkedin",    form.linkedin);
    data.append("email",       form.email);
    if (imageFile) data.append("profileImage", imageFile);

    if (editId) {
      dispatch(updateTeamMember({ id: editId, formData: data }));
      setEditId(null);
    } else {
      dispatch(saveTeamMember(data));
    }

    resetForm();
  };

  const handleEdit = (member) => {
    setEditId(member._id); // ✅ use _id
    setForm({
      name:        member.name        || "",
      designation: member.designation || "",
      description: member.description || "",
      linkedin:    member.linkedin    || "",
      email:       member.email       || "",
    });
    setPreview(
      member.profileImage
        ? member.profileImage.startsWith("http")
          ? member.profileImage
          : `${BASE_URL}${member.profileImage}`
        : ""
    );
    setImageFile(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this member?")) {
      dispatch(deleteTeamMember(id)); // ✅ use _id
    }
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setImageFile(null);
    setPreview("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Manage Our Team</h2>

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-8">
        {/* Required */}
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name *"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="designation"
          value={form.designation}
          onChange={handleChange}
          placeholder="Designation *"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
          rows={3}
        />

        {/* Optional */}
        <input
          type="url"
          name="linkedin"
          value={form.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn URL (optional)"
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email (optional)"
          className="w-full border p-2 rounded"
        />

        {/* Image upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="w-full border p-2 rounded"
        />
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-24 h-24 object-cover rounded-full"
          />
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Saving..." : editId ? "Update" : "Add Member"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 text-white px-6 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* LIST */}
      <div className="space-y-3">
        {members.length === 0 && (
          <p className="text-gray-500">No members found.</p>
        )}
        {members.map((m) => (
          <div
            key={m._id} // ✅ use _id
            className="flex items-center justify-between border p-3 rounded"
          >
            <div className="flex items-center gap-4">
              {m.profileImage ? (
                <img
                  src={
                    m.profileImage.startsWith("http")
                      ? m.profileImage
                      : `${BASE_URL}${m.profileImage}`
                  }
                  className="w-14 h-14 object-cover rounded-full"
                  alt={m.name}
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-[#1F6E8C] flex items-center justify-center text-white font-bold text-xl">
                  {m.name?.charAt(0)}
                </div>
              )}
              <div>
                <h4 className="font-bold">{m.name}</h4>
                <p className="text-sm text-gray-500">{m.designation}</p>
                {m.email && (
                  <p className="text-xs text-gray-400">{m.email}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(m)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(m._id)} // ✅ use _id
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

export default TeamAdmin;
