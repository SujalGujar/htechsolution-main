import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/sections";

/* ================= FETCH ================= */
export const fetchSections = createAsyncThunk(
  "blogGallery/fetchSections",
  async () => {
    const res = await axios.get(API_URL);
    return res.data;
  }
);

/* ================= SAVE ================= */
export const saveSection = createAsyncThunk(
  "blogGallery/saveSection",
  async (formData) => {
    const res = await axios.post(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  }
);

/* ================= DELETE ================= */
export const deleteSection = createAsyncThunk(
  "blogGallery/deleteSection",
  async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  }
);

/* ================= SLICE ================= */
const BlogsSlice = createSlice({
  name: "blogGallery", // ✅ UNIQUE NAME
  initialState: {
    gallerySections: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* FETCH */
      .addCase(fetchSections.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.loading = false;
        state.gallerySections = action.payload;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* SAVE */
      .addCase(saveSection.fulfilled, (state, action) => {
        state.gallerySections = action.payload;
      })

      /* DELETE */
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.gallerySections = action.payload;
      });
  },
});

export default BlogsSlice.reducer;
