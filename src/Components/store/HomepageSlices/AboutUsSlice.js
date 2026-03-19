import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://htechsolution-main.onrender.com/api/about-us";

// FETCH ALL
export const fetchAboutUs = createAsyncThunk(
  "aboutUsSection/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch");
    }
  }
);

// ADD — ✅ FormData for file upload
export const addAboutUs = createAsyncThunk(
  "aboutUsSection/add",
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

// UPDATE — ✅ FormData for file upload
export const updateAboutUs = createAsyncThunk(
  "aboutUsSection/update",
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

// DELETE
export const deleteAboutUs = createAsyncThunk(
  "aboutUsSection/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete");
    }
  }
);

const aboutUsSlice = createSlice({
  name: "aboutUsSection",
  initialState: {
    aboutUsList: [],
    status: "idle",
    error:  null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchAboutUs.pending,   (state) => { state.status = "loading"; })
      .addCase(fetchAboutUs.fulfilled, (state, action) => {
        state.status    = "succeeded";
        state.aboutUsList = action.payload;
      })
      .addCase(fetchAboutUs.rejected,  (state, action) => {
        state.status = "failed";
        state.error  = action.payload;
      })
      // ADD
      .addCase(addAboutUs.pending,   (state) => { state.status = "loading"; })
      .addCase(addAboutUs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.aboutUsList.unshift(action.payload);
      })
      .addCase(addAboutUs.rejected,  (state, action) => {
        state.status = "failed";
        state.error  = action.payload;
      })
      // UPDATE
      .addCase(updateAboutUs.pending,   (state) => { state.status = "loading"; })
      .addCase(updateAboutUs.fulfilled, (state, action) => {
        state.status  = "succeeded";
        const index = state.aboutUsList.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) state.aboutUsList[index] = action.payload;
      })
      .addCase(updateAboutUs.rejected,  (state, action) => {
        state.status = "failed";
        state.error  = action.payload;
      })
      // DELETE
      .addCase(deleteAboutUs.fulfilled, (state, action) => {
        state.aboutUsList = state.aboutUsList.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteAboutUs.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default aboutUsSlice.reducer;
