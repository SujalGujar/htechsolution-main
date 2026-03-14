import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Backend API - no more localStorage
const API = "http://localhost:5000/api/client-experiences";

// FETCH ALL
export const fetchExperiences = createAsyncThunk(
  "clientExperience/fetch",
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
export const addExperience = createAsyncThunk(
  "clientExperience/add",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(API, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Add failed");
    }
  }
);

// UPDATE
export const updateExperience = createAsyncThunk(
  "clientExperience/update",
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
export const deleteExperience = createAsyncThunk(
  "clientExperience/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

const clientExperienceSlice = createSlice({
  name: "clientExperience",
  initialState: {
    experiences: [],   // ✅ no localStorage
    loading:     false,
    error:       null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchExperiences.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(fetchExperiences.fulfilled, (state, action) => {
        state.loading    = false;
        state.experiences = action.payload;
      })
      .addCase(fetchExperiences.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })
      // ADD
      .addCase(addExperience.pending,   (state) => { state.loading = true; })
      .addCase(addExperience.fulfilled, (state, action) => {
        state.loading = false;
        state.experiences.unshift(action.payload);
      })
      .addCase(addExperience.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })
      // UPDATE
      .addCase(updateExperience.pending,   (state) => { state.loading = true; })
      .addCase(updateExperience.fulfilled, (state, action) => {
        state.loading    = false;
        const index = state.experiences.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) state.experiences[index] = action.payload;
      })
      .addCase(updateExperience.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })
      // DELETE
      .addCase(deleteExperience.pending,   (state) => { state.loading = true; })
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.loading     = false;
        state.experiences = state.experiences.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteExperience.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });
  },
});

export default clientExperienceSlice.reducer;