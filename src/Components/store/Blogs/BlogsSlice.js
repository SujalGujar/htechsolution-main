import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Dedicated API
const API = "https://htechsolution-main.onrender.com/api/blogs";

// FETCH ALL
export const fetchSections = createAsyncThunk(
  "blogGallery/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

// SAVE (create)
export const saveSection = createAsyncThunk(
  "blogGallery/save",
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
export const updateSection = createAsyncThunk(
  "blogGallery/update",
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
export const deleteSection = createAsyncThunk(
  "blogGallery/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

const BlogsSlice = createSlice({
  name: "blogGallery",
  initialState: {
    gallerySections: [],
    loading:         false,
    error:           null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchSections.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.loading          = false;
        state.gallerySections  = action.payload;
      })
      .addCase(fetchSections.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })
      // SAVE
      .addCase(saveSection.pending,   (state) => { state.loading = true; })
      .addCase(saveSection.fulfilled, (state, action) => {
        state.loading = false;
        state.gallerySections.unshift(action.payload);
      })
      .addCase(saveSection.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })
      // UPDATE
      .addCase(updateSection.pending,   (state) => { state.loading = true; })
      .addCase(updateSection.fulfilled, (state, action) => {
        state.loading = false;
        const index   = state.gallerySections.findIndex(
          (b) => b._id === action.payload._id
        );
        if (index !== -1) state.gallerySections[index] = action.payload;
      })
      .addCase(updateSection.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })
      // DELETE
      .addCase(deleteSection.pending,   (state) => { state.loading = true; })
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.loading         = false;
        state.gallerySections = state.gallerySections.filter(
          (b) => b._id !== action.payload
        );
      })
      .addCase(deleteSection.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });
  },
});

export default BlogsSlice.reducer;
