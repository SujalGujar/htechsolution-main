import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/sections";

// ========== THUNK ACTIONS ==========

// Fetch all trending topics
const fetchTrending = createAsyncThunk(
  "trending/fetch",
  async () => {
    try {
      const response = await axios.get(API);
      return response.data.filter(item => item.type === "trending");
    } catch (error) {
      console.error("Error fetching trending topics:", error);
      throw error;
    }
  }
);

// Add new trending topic
const addTrending = createAsyncThunk(
  "trending/add",
  async (formData) => {
    try {
      const response = await axios.post(API, formData);
      return response.data;
    } catch (error) {
      console.error("Error adding trending topic:", error);
      throw error;
    }
  }
);

// Delete trending topic by ID
const deleteTrending = createAsyncThunk(
  "trending/delete",
  async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      return id;
    } catch (error) {
      console.error("Error deleting trending topic:", error);
      throw error;
    }
  }
);

// Auto delete expired topics
const autoDeleteExpired = createAsyncThunk(
  "trending/autoDeleteExpired",
  async (_, { getState }) => {
    const now = new Date();
    const items = getState().trending.list;
    const expiredItems = [];

    // Identify expired items
    items.forEach(item => {
      if (item.endTime) {
        const endDate = new Date(item.endTime);
        if (endDate < now) {
          expiredItems.push(item.id);
        }
      }
    });

    // Delete expired items from backend
    const deletePromises = expiredItems.map(id => 
      axios.delete(`${API}/${id}`).catch(err => {
        console.error(`Failed to delete item ${id}:`, err);
        return null;
      })
    );

    await Promise.all(deletePromises);
    
    // Return expired IDs for reducer
    return expiredItems;
  }
);

// ========== SLICE ==========

const trendingSlice = createSlice({
  name: "trending",
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {
    // Synchronous actions can go here if needed
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchTrending
      .addCase(fetchTrending.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTrending.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Handle addTrending
      .addCase(addTrending.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTrending.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addTrending.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Handle deleteTrending
      .addCase(deleteTrending.fulfilled, (state, action) => {
        state.list = state.list.filter(item => item.id !== action.payload);
      })
      
      // Handle autoDeleteExpired
      .addCase(autoDeleteExpired.fulfilled, (state, action) => {
        // Filter out expired items from the list
        if (action.payload && action.payload.length > 0) {
          state.list = state.list.filter(item => !action.payload.includes(item.id));
        }
      });
  }
});



// Export the async thunks
export {
  fetchTrending,
  addTrending,
  deleteTrending,
  autoDeleteExpired
};

// Export the slice reducer as default
export default trendingSlice.reducer;

// Export any synchronous actions
export const { clearError } = trendingSlice.actions;