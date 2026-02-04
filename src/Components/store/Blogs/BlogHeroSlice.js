import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/sections";

/* ================= THUNKS ================= */

export const fetchBlogs = createAsyncThunk(
  "blogHero/fetchBlogs",
  async () => {
    const res = await axios.get(API_URL);
    return res.data;
  }
);

export const saveBlog = createAsyncThunk(
  "blogHero/saveBlog",
  async (formData) => {
    const res = await axios.post(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  }
);

export const deleteBlog = createAsyncThunk(
  "blogHero/deleteBlog",
  async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  }
);

/* ================= SLICE ================= */

const blogHeroSlice = createSlice({
  name: "blogHero",
  initialState: {
    blogs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
      })
      .addCase(saveBlog.fulfilled, (state, action) => {
        state.blogs = action.payload;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = action.payload;
      });
  },
});

export default blogHeroSlice.reducer;
