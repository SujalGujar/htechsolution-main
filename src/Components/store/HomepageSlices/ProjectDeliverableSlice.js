import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Fixed URL - added /api prefix
const API = "https://htechsolution-main.onrender.com/api/project-deliverables";

// FETCH ALL
export const fetchDeliverables = createAsyncThunk(
  "projectDeliverables/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

// SAVE (create or update)
export const saveDeliverable = createAsyncThunk(
  "projectDeliverables/save",
  async (formData, { rejectWithValue }) => {
    try {
      // ✅ Check if updating (has _id) or creating (no _id)
      const id = formData.get("id");

      let res;
      if (id) {
        // UPDATE - PUT request
        res = await axios.put(`${API}/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // CREATE - POST request
        res = await axios.post(API, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      return res.data; // ✅ must return data so Redux updates state
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Save failed");
    }
  }
);

// DELETE
export const deleteDeliverable = createAsyncThunk(
  "projectDeliverables/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/${id}`);
      return id; // return id to remove from state
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

const projectDeliverableSlice = createSlice({
  name: "projectDeliverables",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchDeliverables.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliverables.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchDeliverables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SAVE (handles both create and update)
      .addCase(saveDeliverable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveDeliverable.fulfilled, (state, action) => {
        state.loading = false;
        const saved = action.payload;
        // ✅ Check if update or create
        const index = state.list.findIndex(
          (item) => item._id === saved._id
        );
        if (index !== -1) {
          // Update existing item in list
          state.list[index] = saved;
        } else {
          // Add new item to top of list
          state.list.unshift(saved);
        }
      })
      .addCase(saveDeliverable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteDeliverable.fulfilled, (state, action) => {
        // ✅ Filter using _id not id
        state.list = state.list.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteDeliverable.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default projectDeliverableSlice.reducer;
