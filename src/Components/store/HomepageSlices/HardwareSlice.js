import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "softwareSolutions";

const initialState = {
  solutions: JSON.parse(localStorage.getItem(STORAGE_KEY)) || [],
};

const softwareSolutionSlice = createSlice({
  name: "softwareSolutions",
  initialState,
  reducers: {
    addSolution: (state, action) => {
      state.solutions.push(action.payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.solutions));
    },

    updateSolution: (state, action) => {
      const { index, updatedData } = action.payload;
      state.solutions[index] = updatedData;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.solutions));
    },

    deleteSolution: (state, action) => {
      state.solutions.splice(action.payload, 1);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.solutions));
    },
  },
});

export const { addSolution, updateSolution, deleteSolution } =
  softwareSolutionSlice.actions;

export default softwareSolutionSlice.reducer;
