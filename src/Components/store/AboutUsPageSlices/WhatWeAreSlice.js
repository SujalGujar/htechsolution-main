import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "http://localhost:5000/sections";

// Fetch all sections
export const fetchWhatWeAre = createAsyncThunk(
  "whatWeAre/fetch",
  async () => {
    const res = await axios.get(API);
    return res.data;
  }
);

// Update / Create section
export const saveWhatWeAre = createAsyncThunk(
  "whatWeAre/save",
  async (formData) => {
    const res = await axios.post(API, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  }
);

// Delete section
export const deleteWhatWeAre = createAsyncThunk(
  "whatWeAre/delete",
  async (id) => {
    await axios.delete(`${API}/${id}`);
    return id;
  }
);

const whatWeAreSlice = createSlice({
  name: "whatWeAre",
  initialState: {
    sections: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchWhatWeAre.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWhatWeAre.fulfilled, (state, action) => {
        state.sections = action.payload.sort(
          (a, b) => (a.order ?? 0) - (b.order ?? 0)
        );
        state.loading = false;
      })
      .addCase(fetchWhatWeAre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // SAVE
      .addCase(saveWhatWeAre.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveWhatWeAre.fulfilled, (state, action) => {
        state.sections = action.payload.sort(
          (a, b) => (a.order ?? 0) - (b.order ?? 0)
        );
        state.loading = false;
      })
      .addCase(saveWhatWeAre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // DELETE
      .addCase(deleteWhatWeAre.fulfilled, (state, action) => {
        state.sections = state.sections.filter(
          (s) => s.id !== action.payload
        );
      });
  },
});

export default whatWeAreSlice.reducer;
