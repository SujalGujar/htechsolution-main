import { createSlice } from "@reduxjs/toolkit";


const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("clientExperiences");
    return data ? JSON.parse(atob(data)) : [];
  } catch (error) {
    console.error("LocalStorage error:", error);
    return [];
  }
};

const saveToLocalStorage = (data) => {
  localStorage.setItem("clientExperiences", btoa(JSON.stringify(data)));
};


const initialState = {
  experiences: loadFromLocalStorage(),
};


const clientExperienceSlice = createSlice({
  name: "clientExperience",
  initialState,
  reducers: {

    addExperience: (state, action) => {
      state.experiences.push(action.payload);
      saveToLocalStorage(state.experiences);
    },

    updateExperience: (state, action) => {
      const index = state.experiences.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.experiences[index] = action.payload;
        saveToLocalStorage(state.experiences);
      }
    },

    deleteExperience: (state, action) => {
      state.experiences = state.experiences.filter(
        (item) => item.id !== action.payload
      );
      saveToLocalStorage(state.experiences);
    },
  },
});

export const {
  addExperience,
  updateExperience,
  deleteExperience,
} = clientExperienceSlice.actions;

export default clientExperienceSlice.reducer;
