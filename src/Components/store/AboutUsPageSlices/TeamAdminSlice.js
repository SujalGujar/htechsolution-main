import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ New dedicated API
const API = "https://htechsolution-main.onrender.com/api/our-team";

// FETCH ALL
export const fetchTeam = createAsyncThunk(
  "ourTeam/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

// ADD
export const saveTeamMember = createAsyncThunk(
  "ourTeam/save",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(API, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Save failed");
    }
  }
);

// UPDATE
export const updateTeamMember = createAsyncThunk(
  "ourTeam/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

// DELETE
export const deleteTeamMember = createAsyncThunk(
  "ourTeam/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

const ourTeamSlice = createSlice({
  name: "ourTeam",
  initialState: {
    members: [],
    loading: false,
    error:   null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchTeam.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(fetchTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
      })
      .addCase(fetchTeam.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })
      // SAVE
      .addCase(saveTeamMember.pending,   (state) => { state.loading = true; })
      .addCase(saveTeamMember.fulfilled, (state, action) => {
        state.loading = false;
        state.members.unshift(action.payload);
      })
      .addCase(saveTeamMember.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })
      // UPDATE
      .addCase(updateTeamMember.pending,   (state) => { state.loading = true; })
      .addCase(updateTeamMember.fulfilled, (state, action) => {
        state.loading    = false;
        const index = state.members.findIndex(
          (m) => m._id === action.payload._id
        );
        if (index !== -1) state.members[index] = action.payload;
      })
      .addCase(updateTeamMember.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })
      // DELETE
      .addCase(deleteTeamMember.pending,   (state) => { state.loading = true; })
      .addCase(deleteTeamMember.fulfilled, (state, action) => {
        state.loading = false;
        state.members = state.members.filter(
          (m) => m._id !== action.payload
        );
      })
      .addCase(deleteTeamMember.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });
  },
});

export default ourTeamSlice.reducer;
