import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/project-deliverables";

/* ---------- THUNKS ---------- */
export const fetchDeliverables = createAsyncThunk(
  "projectDeliverables/fetch",
  async () => {
    const res = await axios.get(API);
    return res.data;
  }
);

export const saveDeliverable = createAsyncThunk(
  "projectDeliverables/save",
  async (formData) => {
    await axios.post(API, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
);

export const deleteDeliverable = createAsyncThunk(
  "projectDeliverables/delete",
  async (id) => {
    await axios.delete(`${API}/${id}`);
    return id;
  }
);

/* ---------- SLICE ---------- */
const projectDeliverableSlice = createSlice({
  name: "projectDeliverables",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliverables.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDeliverables.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchDeliverables.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteDeliverable.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item.id !== action.payload);
      });
  },
});

export default projectDeliverableSlice.reducer;
