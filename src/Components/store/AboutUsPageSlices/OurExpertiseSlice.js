import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/sections";

/* ---------- THUNKS ---------- */

// Fetch only expertise sections
export const fetchExpertise = createAsyncThunk(
  "expertise/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL);
      return res.data.filter(item => item.type === "expertise");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch expertise");
    }
  }
);

// Add new expertise
export const saveExpertise = createAsyncThunk(
  "expertise/save",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to save expertise");
    }
  }
);

// Update existing expertise
export const updateExpertise = createAsyncThunk(
  "expertise/update",
  async (formData, { rejectWithValue }) => {
    try {
      const id = formData.get("id");
      const res = await axios.put(`${API_URL}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update expertise");
    }
  }
);

// Delete expertise
export const deleteExpertise = createAsyncThunk(
  "expertise/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete expertise");
    }
  }
);

/* ---------- SLICE ---------- */

const expertiseSlice = createSlice({
  name: "expertise",
  initialState: {
    list: [],
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Expertise
      .addCase(fetchExpertise.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpertise.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.error = null;
      })
      .addCase(fetchExpertise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Save Expertise (Create)
      .addCase(saveExpertise.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(saveExpertise.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Add new expertise
        state.list.push(action.payload);
      })
      .addCase(saveExpertise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      
      // Update Expertise
      .addCase(updateExpertise.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateExpertise.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Update existing expertise
        const updatedExpertise = action.payload;
        const index = state.list.findIndex(item => item.id === updatedExpertise.id);
        if (index !== -1) {
          state.list[index] = updatedExpertise;
        }
      })
      .addCase(updateExpertise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      
      // Delete Expertise
      .addCase(deleteExpertise.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExpertise.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(item => item.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteExpertise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess } = expertiseSlice.actions;
export default expertiseSlice.reducer;