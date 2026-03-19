import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Backend API URL
const API = "https://htechsolution-main.onrender.com/api/software-projects";

// FETCH ALL
export const fetchProjects = createAsyncThunk(
  "projects/fetch",
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
export const addProject = createAsyncThunk(
  "projects/add",
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
export const updateProject = createAsyncThunk(
  "projects/update",
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
export const deleteProject = createAsyncThunk(
  "projects/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    list: [],         // ✅ NO localStorage - fresh from backend
    loading: false,
    error: null,
  },
  reducers: {},       // ✅ NO local reducers - all async thunks
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchProjects.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProjects.rejected,  (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ADD
      .addCase(addProject.pending,   (state) => { state.loading = true; })
      .addCase(addProject.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })
      .addCase(addProject.rejected,  (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // UPDATE
      .addCase(updateProject.pending,   (state) => { state.loading = true; })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(updateProject.rejected,  (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // DELETE
      .addCase(deleteProject.pending,   (state) => { state.loading = true; })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((p) => p._id !== action.payload);
      })
      .addCase(deleteProject.rejected,  (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;
// ```

// ---

// ### Step 3 — Verify backend route works

// Open this in browser:
// ```
// https://htechsolution-main.onrender.com/api/software-projects
