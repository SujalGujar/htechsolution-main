import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMember, updateMember, deleteMember } from "../../store/HomepageSlices/OurPartnerSlice";
import { compressImageToBase64 } from "../../../Utils/imageToBase64";

const OurPartnerForm = () => {
  const members = useSelector((state) => state.team?.members || []);
  const dispatch = useDispatch();

  const [editData, setEditData] = useState(null);

  const [form, setForm] = useState({
    id: null,
    name: "",
    position: "",
    image: "",
  });

  useEffect(() => {
    if (editData) setForm(editData);
  }, [editData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const compressedImage = await compressImageToBase64(file, 120, 0.6);
    setForm({ ...form, image: compressedImage });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.position) return;

    if (form.id) {
      dispatch(updateMember(form));
    } else {
      dispatch(addMember({ ...form, id: Date.now() }));
    }

    setForm({ id: null, name: "", position: "", image: "" });
    setEditData(null);
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">

        {/* ===== FORM ===== */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-lg font-bold text-[#1F6E8C]">
            {form.id ? "Edit Member" : "Add Team Member"}
          </h2>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            name="position"
            value={form.position}
            onChange={handleChange}
            placeholder="Position"
            className="w-full border p-2 rounded"
            required
          />

          <input type="file" accept="image/*" onChange={handleImage} required={!form.id} />

          {form.image && (
            <img src={form.image} alt="Preview" className="w-20 h-20 object-cover rounded" />
          )}

          <button type="submit" className="w-full bg-[#1F6E8C] text-white py-2 rounded">
            {form.id ? "Update" : "Add"}
          </button>
        </form>

        {/* ===== LIST ===== */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-bold mb-4 text-[#1F6E8C]">
            Team Members
          </h2>

          {members.length === 0 && <p className="text-gray-500">No members added yet.</p>}

          <div className="space-y-4">
            {members.map((member) => (
              <div key={member.id} className="flex items-center gap-4 border p-3 rounded">
                <img src={member.image} alt={member.name} className="w-16 h-16 object-cover rounded" />

                <div className="flex-1">
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.position}</p>
                </div>

                <button onClick={() => setEditData(member)} className="text-blue-600 text-sm">Edit</button>
                <button onClick={() => dispatch(deleteMember(member.id))} className="text-red-600 text-sm">Delete</button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default OurPartnerForm;
