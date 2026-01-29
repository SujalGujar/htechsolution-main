import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/sections";

export const fetchSections = createAsyncThunk(
  "sections/fetch",
  async () => {
    try {
      const res = await axios.get(API_URL);
      return res.data || [];
    } catch (error) {
      console.error("Error fetching sections:", error);
      throw error;
    }
  }
);

export const saveSection = createAsyncThunk(
  "sections/save",
  async (formData, { rejectWithValue }) => {
    try {
      let response;
      
      if (formData.get("id")) {
        // Update existing section
        const id = formData.get("id");
        response = await axios.put(`${API_URL}/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Create new section
        response = await axios.post(API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      
      return response.data;
    } catch (error) {
      console.error("Error saving section:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteSection = createAsyncThunk(
  "sections/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      console.error("Error deleting section:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const visionMissionSlice = createSlice({
  name: "sections",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Add a reducer to manually update list after delete
    removeSection: (state, action) => {
      state.list = state.list.filter(item => item.id !== action.payload);
    },
    resetSections: (state) => {
      state.list = [];
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.loading = false;
        state.list = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.list = [];
      })
      .addCase(saveSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveSection.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.id) {
          const index = state.list.findIndex(item => item.id === action.payload.id);
          if (index !== -1) {
            // Update existing item
            state.list[index] = action.payload;
          } else {
            // Add new item
            state.list.push(action.payload);
          }
        }
      })
      .addCase(saveSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.loading = false;
        // Filter out the deleted item immediately
        state.list = state.list.filter(item => item.id !== action.payload);
      })
      .addCase(deleteSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { removeSection, resetSections } = visionMissionSlice.actions;
export default visionMissionSlice.reducer;