// src/store/OurTeamSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL
const API_URL = "http://localhost:5000/sections";

// Fetch team members
export const fetchTeam = createAsyncThunk("team/fetchTeam", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

// Add / Update a team member
export const saveTeamMember = createAsyncThunk(
  "team/saveTeamMember",
  async (member) => {
    const formData = new FormData();
    formData.append("id", member.id || "");
    formData.append("title", member.name);
    formData.append("content", member.about);
    formData.append("color", member.role); // we can store role in color for demo
    if (member.imageFile) formData.append("image", member.imageFile);

    const res = await axios.post(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  }
);

// Delete a member
export const deleteTeamMember = createAsyncThunk(
  "team/deleteTeamMember",
  async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  }
);

const ourTeamSlice = createSlice({
  name: "ourTeam",
  initialState: {
    members: [],  
    status: "idle",
  },
  reducers: {},
 extraReducers: (builder) => {
  builder
    .addCase(fetchTeam.fulfilled, (state, action) => {
      state.members = Array.isArray(action.payload)
        ? action.payload
        : action.payload?.data || [];
    })
    .addCase(saveTeamMember.fulfilled, (state, action) => {
      state.members = Array.isArray(action.payload)
        ? action.payload
        : action.payload?.data || [];
    })
    .addCase(deleteTeamMember.fulfilled, (state, action) => {
      state.members = Array.isArray(action.payload)
        ? action.payload
        : action.payload?.data || [];
    });
}
});

export default ourTeamSlice.reducer;
