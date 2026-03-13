// import { createSlice } from "@reduxjs/toolkit";

// // 🔹 Load from localStorage
// const loadHeroFromStorage = () => {
//   const data = localStorage.getItem("heroSection");
//   return data ? JSON.parse(data) : [];
// };

// const saveToStorage = (data) => {
//   localStorage.setItem("heroSection", JSON.stringify(data));
// };

// const initialState = {
//   heroList: loadHeroFromStorage(), 
// };

// const heroSectionSlice = createSlice({
//   name: "heroSection",
//   initialState,
//   reducers: {
    
//     addHeroSection: (state, action) => {
//       state.heroList.push(action.payload);
//       saveToStorage(state.heroList);
//     },

    
//     updateHeroSection: (state, action) => {
//       const { index, updatedData } = action.payload;
//       state.heroList[index] = updatedData;
//       saveToStorage(state.heroList);
//     },

//     // 
//     deleteHeroSection: (state, action) => {
//       state.heroList.splice(action.payload, 1);
//       saveToStorage(state.heroList);
//     },

    
//     clearHeroSection: (state) => {
//       state.heroList = [];
//       localStorage.removeItem("heroSection");
//     },
//   },
// });

// export const {
//   addHeroSection,
//   updateHeroSection,
//   deleteHeroSection,
//   clearHeroSection,
// } = heroSectionSlice.actions;

// export default heroSectionSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/hero-section";

/* ── THUNKS ──────────────────────────────────────────────────────────────── */

// Fetch all hero sections from backend
export const fetchHeroSections = createAsyncThunk(
  "heroSection/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch");
    }
  }
);

// Add new hero section (supports image upload via FormData)
export const addHeroSection = createAsyncThunk(
  "heroSection/add",
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

// Update hero section by id
export const updateHeroSection = createAsyncThunk(
  "heroSection/update",
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

// Delete hero section by id
export const deleteHeroSection = createAsyncThunk(
  "heroSection/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete");
    }
  }
);

/* ── SLICE ───────────────────────────────────────────────────────────────── */

const heroSectionSlice = createSlice({
  name: "heroSection",
  initialState: {
    heroList: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder

      // ── FETCH ──
      .addCase(fetchHeroSections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHeroSections.fulfilled, (state, action) => {
        state.loading = false;
        state.heroList = action.payload;
      })
      .addCase(fetchHeroSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ── ADD ──
      .addCase(addHeroSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addHeroSection.fulfilled, (state, action) => {
        state.loading = false;
        state.heroList.push(action.payload);
      })
      .addCase(addHeroSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ── UPDATE ──
      .addCase(updateHeroSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHeroSection.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.heroList.findIndex(h => h._id === action.payload._id);
        if (index !== -1) state.heroList[index] = action.payload;
      })
      .addCase(updateHeroSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ── DELETE ──
      .addCase(deleteHeroSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHeroSection.fulfilled, (state, action) => {
        state.loading = false;
        state.heroList = state.heroList.filter(h => h._id !== action.payload);
      })
      .addCase(deleteHeroSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = heroSectionSlice.actions;
export default heroSectionSlice.reducer;