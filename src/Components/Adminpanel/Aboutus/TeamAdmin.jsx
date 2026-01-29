import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeam, saveTeamMember, deleteTeamMember } from "../../store/AboutUsPageSlices/TeamAdminSlice";

const EMPTY_MEMBER = { id: "", name: "", role: "", about: "", imageFile: null, image: "" };

const TeamAdmin = () => {
  const dispatch = useDispatch();

  // ✅ Safe selector: use optional chaining and fallback
  const members = useSelector((state) => state.ourTeam?.members || []);

  const [formData, setFormData] = useState(EMPTY_MEMBER);

  useEffect(() => {
    dispatch(fetchTeam());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setFormData({ ...formData, imageFile: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveTeamMember(formData));
    setFormData(EMPTY_MEMBER);
  };

  const handleEdit = (member) => {
    setFormData({
      id: member.id,
      name: member.title,
      role: member.color,
      about: member.content,
      image: member.image,
      imageFile: null,
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteTeamMember(id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Manage Our Team</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Role"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
          placeholder="About / Description"
          className="w-full border p-2 rounded"
          required
        />
        <input type="file" name="image" onChange={handleChange} />
        {formData.image && !formData.imageFile && (
          <img
            src={`http://localhost:5000${formData.image}`}
            className="w-24 h-24 object-cover mt-2"
          />
        )}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          {formData.id ? "Update" : "Add"} Member
        </button>
      </form>

      {/* Members List */}
      <div className="mt-8">
        {members.length === 0 ? (
          <p>No members found.</p>
        ) : (
          members.map((m) => (
            <div
              key={m.id}
              className="flex items-center justify-between border p-3 rounded mb-2"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`http://localhost:5000${m.image}`}
                  className="w-16 h-16 object-cover rounded"
                  alt={m.title}
                />
                <div>
                  <h4 className="font-bold">{m.title}</h4>
                  <p>{m.color}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(m)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeamAdmin;
