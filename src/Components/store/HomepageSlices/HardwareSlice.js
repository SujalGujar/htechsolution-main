import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/hardware-solutions";

/* ── THUNKS ──────────────────────────────────────────────────────────────── */

export const fetchSolutions = createAsyncThunk(
  "softwareSolutions/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch");
    }
  }
);

export const addSolution = createAsyncThunk(
  "softwareSolutions/add",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(API, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to add");
    }
  }
);

export const updateSolution = createAsyncThunk(
  "softwareSolutions/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update");
    }
  }
);

export const deleteSolution = createAsyncThunk(
  "softwareSolutions/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete");
    }
  }
);

/* ── SLICE ───────────────────────────────────────────────────────────────── */

const softwareSolutionSlice = createSlice({
  name: "softwareSolutions",
  initialState: {
    solutions: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchSolutions.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchSolutions.fulfilled, (state, action) => {
        state.loading = false;
        state.solutions = action.payload;
      })
      .addCase(fetchSolutions.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // ADD
      .addCase(addSolution.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addSolution.fulfilled, (state, action) => {
        state.loading = false;
        state.solutions.push(action.payload);
      })
      .addCase(addSolution.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // UPDATE
      .addCase(updateSolution.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateSolution.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.solutions.findIndex(s => s.id === action.payload.id);
        if (index !== -1) state.solutions[index] = action.payload;
      })
      .addCase(updateSolution.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // DELETE
      .addCase(deleteSolution.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(deleteSolution.fulfilled, (state, action) => {
        state.loading = false;
        state.solutions = state.solutions.filter(s => s.id !== action.payload);
      })
      .addCase(deleteSolution.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { clearError } = softwareSolutionSlice.actions;
export default softwareSolutionSlice.reducer;