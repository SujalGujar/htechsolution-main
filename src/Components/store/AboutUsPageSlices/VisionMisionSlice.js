import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/sections";

// FETCH ALL
export const fetchSections = createAsyncThunk(
  "sections/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API);
      return res.data || [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

// SAVE (create or update)
export const saveSection = createAsyncThunk(
  "sections/save",
  async (formData, { rejectWithValue }) => {
    try {
      // ✅ Check _id not id
      const id = formData.get("id");
      let res;

      if (id) {
        res = await axios.put(`${API}/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await axios.post(API, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Save failed");
    }
  }
);

// DELETE
export const deleteSection = createAsyncThunk(
  "sections/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

const visionMissionSlice = createSlice({
  name: "sections",
  initialState: {
    list:    [],
    loading: false,
    error:   null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchSections.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.loading = false;
        state.list    = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchSections.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
        state.list    = [];
      })
      // SAVE
      .addCase(saveSection.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(saveSection.fulfilled, (state, action) => {
        state.loading    = false;
        const saved      = action.payload;
        // ✅ Use _id not id
        const index = state.list.findIndex(
          (item) => item._id === saved._id
        );
        if (index !== -1) {
          state.list[index] = saved; // update
        } else {
          state.list.unshift(saved); // add new
        }
      })
      .addCase(saveSection.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      })
      // DELETE
      .addCase(deleteSection.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.loading = false;
        // ✅ Use _id not id
        state.list = state.list.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteSection.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });
  },
});

export default visionMissionSlice.reducer;