import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Dedicated API - no more /sections
const API = "http://localhost:5000/api/blog-hero";

// FETCH ALL
export const fetchBlogs = createAsyncThunk(
  "blogHero/fetch",
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
export const saveBlog = createAsyncThunk(
  "blogHero/save",
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

// DELETE
export const deleteBlog = createAsyncThunk(
  "blogHero/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/${id}`);
      return id; // ✅ return id to remove from state
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

const blogHeroSlice = createSlice({
  name: "blogHero",
  initialState: {
    blogs:   [],
    loading: false,
    error:   null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchBlogs.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs   = action.payload;
      })
      .addCase(fetchBlogs.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })
      // SAVE
      .addCase(saveBlog.pending,   (state) => { state.loading = true; })
      .addCase(saveBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.unshift(action.payload); // ✅ add to top
      })
      .addCase(saveBlog.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })
      // DELETE
      .addCase(deleteBlog.pending,   (state) => { state.loading = true; })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        // ✅ filter using _id
        state.blogs = state.blogs.filter(
          (b) => b._id !== action.payload
        );
      })
      .addCase(deleteBlog.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });
  },
});

export default blogHeroSlice.reducer;