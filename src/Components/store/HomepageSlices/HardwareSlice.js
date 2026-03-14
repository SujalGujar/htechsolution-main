import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/api/hardware-solutions";

export const fetchSolutions = createAsyncThunk(
  "hardwareSolutions/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

export const addSolution = createAsyncThunk(
  "hardwareSolutions/add",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(API, formData, {
        // ✅ Required for Multer to receive the file
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Add failed");
    }
  }
);

export const updateSolution = createAsyncThunk(
  "hardwareSolutions/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API}/${id}`, formData, {
        // ✅ Required for Multer to receive the file
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

export const deleteSolution = createAsyncThunk(
  "hardwareSolutions/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

const hardwareSlice = createSlice({
  name: "hardwareSolutions",
  initialState: {
    solutions: [],
    loading:   false,
    error:     null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchSolutions.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(fetchSolutions.fulfilled, (state, action) => {
        state.loading   = false;
        state.solutions = action.payload;
      })
      .addCase(fetchSolutions.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })
      // ADD
      .addCase(addSolution.pending,   (state) => { state.loading = true; })
      .addCase(addSolution.fulfilled, (state, action) => {
        state.loading = false;
        state.solutions.unshift(action.payload);
      })
      .addCase(addSolution.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })
      // UPDATE
      .addCase(updateSolution.pending,   (state) => { state.loading = true; })
      .addCase(updateSolution.fulfilled, (state, action) => {
        state.loading    = false;
        const index = state.solutions.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) state.solutions[index] = action.payload;
      })
      .addCase(updateSolution.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })
      // DELETE
      .addCase(deleteSolution.pending,   (state) => { state.loading = true; })
      .addCase(deleteSolution.fulfilled, (state, action) => {
        state.loading   = false;
        state.solutions = state.solutions.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteSolution.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });
  },
});

export default hardwareSlice.reducer;