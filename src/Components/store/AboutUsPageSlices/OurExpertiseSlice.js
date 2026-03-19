import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ New dedicated API
const API = "https://htechsolution-main.onrender.com/api/expertise";

// FETCH ALL
export const fetchExpertise = createAsyncThunk(
  "expertise/fetch",
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
export const saveExpertise = createAsyncThunk(
  "expertise/save",
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
export const updateExpertise = createAsyncThunk(
  "expertise/update",
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
export const deleteExpertise = createAsyncThunk(
  "expertise/delete",
  async (id, { rejectWithValue }) => {
    // ✅ Guard against undefined id
    if (!id) {
      return rejectWithValue("Invalid ID");
    }
    try {
      await axios.delete(`${API}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

const expertiseSlice = createSlice({
  name: "expertise",
  initialState: {
    list:    [],
    loading: false,
    error:   null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchExpertise.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(fetchExpertise.fulfilled, (state, action) => {
        state.loading = false;
        state.list    = action.payload;
      })
      .addCase(fetchExpertise.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })
      // SAVE
      .addCase(saveExpertise.pending,   (state) => { state.loading = true; })
      .addCase(saveExpertise.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })
      .addCase(saveExpertise.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })
      // UPDATE
      .addCase(updateExpertise.pending,   (state) => { state.loading = true; })
      .addCase(updateExpertise.fulfilled, (state, action) => {
        state.loading    = false;
        const index = state.list.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(updateExpertise.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })
      // DELETE
      .addCase(deleteExpertise.pending,   (state) => { state.loading = true; })
      .addCase(deleteExpertise.fulfilled, (state, action) => {
        state.loading = false;
        state.list    = state.list.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteExpertise.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });
  },
});

export default expertiseSlice.reducer;
