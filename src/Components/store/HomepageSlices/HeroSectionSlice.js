import { createSlice } from "@reduxjs/toolkit";

// 🔹 Load from localStorage
const loadHeroFromStorage = () => {
  const data = localStorage.getItem("heroSection");
  return data ? JSON.parse(data) : [];
};

const saveToStorage = (data) => {
  localStorage.setItem("heroSection", JSON.stringify(data));
};

const initialState = {
  heroList: loadHeroFromStorage(), 
};

const heroSectionSlice = createSlice({
  name: "heroSection",
  initialState,
  reducers: {
    
    addHeroSection: (state, action) => {
      state.heroList.push(action.payload);
      saveToStorage(state.heroList);
    },

    
    updateHeroSection: (state, action) => {
      const { index, updatedData } = action.payload;
      state.heroList[index] = updatedData;
      saveToStorage(state.heroList);
    },

    // 
    deleteHeroSection: (state, action) => {
      state.heroList.splice(action.payload, 1);
      saveToStorage(state.heroList);
    },

    
    clearHeroSection: (state) => {
      state.heroList = [];
      localStorage.removeItem("heroSection");
    },
  },
});

export const {
  addHeroSection,
  updateHeroSection,
  deleteHeroSection,
  clearHeroSection,
} = heroSectionSlice.actions;

export default heroSectionSlice.reducer;
