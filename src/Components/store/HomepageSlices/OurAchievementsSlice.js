import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Backend API - no more localStorage
const API = "http://localhost:5000/api/our-achievements";

// FETCH ALL
export const fetchAchievements = createAsyncThunk(
  "ourAchievementsSection/fetch",
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
export const addAchievement = createAsyncThunk(
  "ourAchievementsSection/add",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(API, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Add failed");
    }
  }
);

// UPDATE
export const updateAchievement = createAsyncThunk(
  "ourAchievementsSection/update",
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
export const deleteAchievement = createAsyncThunk(
  "ourAchievementsSection/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

const ourAchievementsSlice = createSlice({
  name: "ourAchievementsSection",
  initialState: {
    achievementsList: [],  // ✅ no localStorage
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchAchievements.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAchievements.fulfilled, (state, action) => {
        state.loading = false;
        state.achievementsList = action.payload;
      })
      .addCase(fetchAchievements.rejected,  (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ADD
      .addCase(addAchievement.pending,   (state) => { state.loading = true; })
      .addCase(addAchievement.fulfilled, (state, action) => {
        state.loading = false;
        state.achievementsList.unshift(action.payload);
      })
      .addCase(addAchievement.rejected,  (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // UPDATE
      .addCase(updateAchievement.pending,   (state) => { state.loading = true; })
      .addCase(updateAchievement.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.achievementsList.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) state.achievementsList[index] = action.payload;
      })
      .addCase(updateAchievement.rejected,  (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // DELETE
      .addCase(deleteAchievement.pending,   (state) => { state.loading = true; })
      .addCase(deleteAchievement.fulfilled, (state, action) => {
        state.loading = false;
        state.achievementsList = state.achievementsList.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteAchievement.rejected,  (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ourAchievementsSlice.reducer;